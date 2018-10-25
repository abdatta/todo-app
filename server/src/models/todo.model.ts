import { Document } from 'mongoose';
/**
 * Interface for Todo
 *
 * @interface TodoModel
 */
export interface TodoModel extends Document {
    title: string;
    order: number;
    completed: boolean;
}
