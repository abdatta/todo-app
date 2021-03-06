import { Request, Response } from 'express';
import { Model } from 'mongoose';

import { TodoModel } from '../models/todo.model';
export class TodosCtrl {

    private todoModel: Model<TodoModel>;

    /**
     * Constructor
     *
     * @class TodosCtrl
     * @constructor
     */
    constructor(model: Model<TodoModel>) {
        this.todoModel = model;
    }

    private URLize(todo: TodoModel) {
        const td = JSON.parse(JSON.stringify(todo));
        if (todo) {
            td['url'] = 'http://localhost:8000/api/todos/' + todo._id;
        }
        return td;
    }

    /**
     * Set options for the API
     *
     * @class TodosCtrl
     * @method setOptions
     */
    public setOptions = (req: Request, res: Response) => {
        res.sendStatus(200);
    }

    /**
     * Add a new todo to database
     *
     * @class TodosCtrl
     * @method addTodo
     */
    public addTodo = (req: Request, res: Response) => {
        const todo = new this.todoModel();
        todo.completed = false;
        todo.title = req.body.title;
        if (req.body.order) {
            todo.order = req.body.order;
        }
        todo.save((error: Error, savedTodo: TodoModel) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                res.status(200).json(this.URLize(todo));
            }
        });
    }

    /**
     * Get list of todos
     *
     * @class TodosCtrl
     * @method getTodosList
     */
    public getTodosList = (req: Request, res: Response) => {
        this.todoModel.find({}, (error: Error, todos: TodoModel[]) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                res.status(200).json(todos.map(todo => this.URLize(todo)));
            }
        });
    }

    /**
     * Get a todo
     *
     * @class TodosCtrl
     * @method getTodo
     */
    public getTodo = (req: Request, res: Response) => {
        this.todoModel.findById(req.params.id, (error: Error, todo: TodoModel) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                res.status(200).json(this.URLize(todo));
            }
        });
    }

    /**
     * Update todo in database
     *
     * @class TodosCtrl
     * @method updateTodo
     */
    public updateTodo = (req: Request, res: Response) => {
        this.todoModel.findById(req.params.id, (error: Error, todo: TodoModel) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                if (req.body.title) {
                    todo.title = req.body.title;
                }
                if (req.body.order !== undefined) {
                    todo.order = req.body.order;
                }
                if (req.body.completed !== undefined) {
                    todo.completed = req.body.completed;
                }
                todo.save((err: Error, savedTodo: TodoModel) => {
                    if (err) {
                        this.internalServer(res, err);
                    } else {
                        res.status(200).json(this.URLize(todo));
                    }
                });
            }
        });
    }

    /**
     * Delete a list of todos from database
     *
     * @class TodosCtrl
     * @method deleteTodosList
     */
    public deleteTodosList = (req: Request, res: Response) => {
        this.todoModel.deleteMany({}, (error: Error) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                res.sendStatus(200);
            }
        });
    }

    /**
     * Delete a todo from database
     *
     * @class TodosCtrl
     * @method deleteTodos
     */
    public deleteTodo = (req: Request, res: Response) => {
        this.todoModel.deleteOne({ _id: req.params.id}, (error: Error) => {
            if (error) {
                this.internalServer(res, error);
            } else {
                res.sendStatus(200);
            }
        });
    }

    /**
     * Send internal server error messages
     *
     * @class TodosCtrl
     * @method internalServer
     */
    private internalServer = (res: Response, err: any) => {
        res.status(500).json({ 'Error': err });
    }
}
