import { Router } from 'express';
import { Model } from 'mongoose';

import { TodosCtrl } from '../controllers/todos.controller';
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
    public static create(todoModel: Model<TodoModel>): Router {

        const todosCtrl: TodosCtrl = new TodosCtrl(todoModel);

        const router: Router = Router();

        router
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
