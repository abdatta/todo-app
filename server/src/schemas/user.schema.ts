import { Schema, HookNextFunction, SchemaType, SchemaTypes } from 'mongoose';
import bcrypt from 'bcrypt';

export let UserSchema: Schema = new Schema({
    username: {type: String, default: '', required: true},
    password: {type: String, default: '', required: true},
});

// Generating Password hash
UserSchema.methods.generateHash = function(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Checking if password is valid
UserSchema.methods.validPassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
};
