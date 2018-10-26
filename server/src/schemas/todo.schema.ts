import { Schema } from 'mongoose';

export let TodoSchema: Schema = new Schema({
    user: {type: String},
    title: {type: String, required: true},
    order: {type: Number },
    completed: {type: Boolean, default: false}
});
