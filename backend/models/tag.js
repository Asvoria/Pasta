import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true
        }
    },
    { timestamps: true }
);

export default model('Tag', tagSchema);
