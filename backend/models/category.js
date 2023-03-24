import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true
        }
    },
    { timestamp: true }
);

export default model('Category', categorySchema);
