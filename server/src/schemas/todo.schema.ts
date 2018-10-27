import { Schema } from 'mongoose';

export let TodoSchema: Schema = new Schema({
    title: {type: String, required: true},
    order: {type: Number, default: 0 },
    completed: {type: Boolean, default: false}
});
