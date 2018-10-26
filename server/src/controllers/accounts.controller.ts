import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

import { UserModel } from '../models/user.model';

export class AccountCtrl {

    private userModel: Model<UserModel>;

    /**
     * Constructor
     *
     * @class AccountCtrl
     * @constructor
     */
    constructor(model: Model<UserModel>) {
        this.userModel = model;
        this.createAdmin();
    }

    /**
     * Sanitize user json being sent
     *
     * @class AccountCtrl
     * @method sanitize
     */
    public sanitize = (user: any) => {
        user = JSON.parse(JSON.stringify(user));
        if (user) {
            user['password'] = undefined;
            user['created'] = undefined;
            user['deleted'] = undefined;
            user['_id'] = undefined;
            user['__v'] = undefined;
        }
        return user;
    }

    /**
     * Check authentication status
     *
     * @class AccountCtrl
     * @method checkAuth
     */
    public checkAuth = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);  // Unauthorized
        }
    }

    /**
     * Check admin authentication
     *
     * @class AccountCtrl
     * @method checkAuth
     */
    public checkAdmin = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated() && req.user.username === 'admin') {
            next();
        } else {
            res.sendStatus(401);  // Unauthorized
        }
    }

    /**
     * Logout user
     *
     * @class AccountCtrl
     * @method logout
     */
    public logout = (req: Request, res: Response) => {
        req.logout();
        res.sendStatus(200);
    }

    public getStats = (req: Request, res: Response) => {
        this.userModel.find({}, (err: Error, users: UserModel[]) => {
            if (err) {
                this.internalServer(res, err);
            } else {
                res.status(200).json(users.map(user => ({
                    username: user.username,
                    created: user.created,
                    deleted: user.deleted
                })));
            }
        });
    }

    public userAddedTodo = (req: Request, res: Response) => {
        this.userModel.findOneAndUpdate(
            {username: req.user.username},
            {$inc : {'created' : 1}},
            {new: true},
            (Err: Error, user: UserModel | null, resp: any) => {
                res.status(200).json(res.locals.todo);
            }
        );
    }

    public userDeletedTodo = (req: Request, res: Response) => {
        this.userModel.findOneAndUpdate(
            {username: req.user.username},
            {$inc : {'deleted' : 1}},
            {new: true},
            (Err: Error, user: UserModel | null, resp: any) => {
                res.sendStatus(200);
            }
        );
    }

    private createAdmin() {
        const admin = new this.userModel();
        admin.username = 'admin';
        admin.password = admin.generateHash('admin123');
        admin.save(e => e);
    }

    /**
     * Send internal server error messages
     *
     * @class AccountCtrl
     * @method internalServer
     */
    private internalServer = (res: Response, err: any) => {
        res.status(500).json({ 'Error': err });
    }
}
