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
     * Logout user
     *
     * @class AccountCtrl
     * @method logout
     */
    public logout = (req: Request, res: Response) => {
        req.logout();
        res.sendStatus(200);
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
