import { Router } from 'express';
import { Model } from 'mongoose';

import { AccountCtrl } from '../controllers/accounts.controller';
import { TodosCtrl } from '../controllers/todos.controller';

import { UserModel } from '../models/user.model';
import { TodoModel } from '../models/todo.model';

/**
 * Route for handling todo items
 *
 * @class TodosRoute
 */
export class TodosRoute {

    /**
     * Create the router
     *
     * @class TodosRoute
     * @method create
     * @return {Router} the router for this route
     * @static
     */
    public static create(todoModel: Model<TodoModel>, userModel: Model<UserModel>): Router {

        const accountCtrl: AccountCtrl = new AccountCtrl(userModel);
        const todosCtrl: TodosCtrl = new TodosCtrl(todoModel);

        const router: Router = Router();

        router
            .use(accountCtrl.checkAuth)
            .options('/', todosCtrl.setOptions)
            .options('/:id', todosCtrl.setOptions)
            .get('/',  todosCtrl.getTodosList)
            .get('/:id', todosCtrl.getTodo)
            .post('/',  todosCtrl.addTodo)
            .patch('/:id', todosCtrl.updateTodo)
            .delete('/', todosCtrl.deleteTodosList)
            .delete('/:id', todosCtrl.deleteTodo);

        return router;
    }

}
