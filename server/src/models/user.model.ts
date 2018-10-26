import { Document } from 'mongoose';
/**
 * Interface for User
 *
 * @interface UserModel
 */
export interface UserModel extends Document {
    username: string;
    password: string;
    generateHash: (password: string) => string;
    validPassword: (password: string) => boolean;
}
