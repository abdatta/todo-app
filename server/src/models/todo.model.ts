import { Document } from 'mongoose';
/**
 * Interface for Todo
 *
 * @interface TodoModel
 */
export interface TodoModel extends Document {
    user: string;
    title: string;
    order: number;
    completed: boolean;
}
