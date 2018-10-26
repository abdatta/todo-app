import bodyParser from 'body-parser';
import express from 'express';
import httpLogger from 'morgan';
import path from 'path';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';

// Routes
import { AccountsRoute } from './routes/accounts.route';
import { TodosRoute } from './routes/todos.route';

// Models
import { TodoModel } from './models/todo.model';
import { UserModel } from './models/user.model';

// Schema
import { UserSchema } from './schemas/user.schema';
import { TodoSchema } from './schemas/todo.schema';

// Config
import { PassportConfig } from './config/passport.config';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  // The express app instance
  public app: express.Application;

  // The mongoose Connection
  private connection!: mongoose.Connection;

  // instances of models
  private userModel!: mongoose.Model<UserModel>; // an instance of UserModel
  private todoModel!: mongoose.Model<TodoModel>; // an instance of todoModel

  /**
   * Bootstrap the application
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app
   */
  public static bootstrap = (): Server => {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {

    // create expressjs application
    this.app = express();

    // configure application
    this.config();
    this.routes();

  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config = (): void => {

    // MongoDB connection
    const dbaddr: string = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
    const dbport: string = process.env.MONGO_PORT_27017_TCP_PORT || '27017';
    const MONGODB_CONNECTION = `mongodb://${ dbaddr }:${ dbport }/${ 'Affable_Todos2' }`;

    httpLogger.token('post', (req: express.Request, res: express.Response) => {
        if (req.method === 'POST' || req.method === 'PATCH') {
            req.body['password'] = undefined;
            return JSON.stringify(req.body);
        } else {
            return ' ';
        }
    });

    this.app.use(httpLogger(':method :url (:status) :post'));

    // use json bodyparser
    this.app.use(bodyParser.json());

    // use query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });

    // connect to mongoose
    require('mongoose').Promise = global.Promise;

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    this.connection = connection;

    // create models
    this.userModel = connection.model<UserModel>('User', UserSchema);
    this.todoModel = connection.model<TodoModel>('Todo', TodoSchema);

    // create MongoStore
    const MongoStore = connectMongo(session);

    // create session
    const esession = session({
      secret: 'qwblaidtbrcwieuwel',
      saveUninitialized: true,
      resave: false,
      store: new MongoStore({
        mongooseConnection: connection
      }),
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000  // 1 day
      }
    });

    // use session
    this.app.use(esession);

    // Set up passport
    PassportConfig.setup(passport, this.userModel);
    this.app.use(passport.initialize());
    this.app.use(passport.session()); // persistent login sessions

  }

  /**
   * Create router
   *
   * @class Server
   * @method routes
   */
  public routes = () => {

    // API Routes
    this.app.use('/api/accounts', AccountsRoute.create(this.userModel, passport));
    this.app.use('/api/todos', TodosRoute.create(this.todoModel, this.userModel));

    // Public Routes
    this.app.use('/', express.static(path.join(__dirname, '../public')));

  }

  /**
   * Shutdown
   *
   * @class Server
   * @method shutdown
   */
  public shutdown = () => {
    console.log('Shutting Down');
    this.connection.close();
  }

}
