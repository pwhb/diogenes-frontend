import mongoose, { type ObjectId } from 'mongoose';
import gameTemplate from './gameTemplate';

const { Schema, model, models } = mongoose;

export interface IInitialState
{
    _id: ObjectId;
    slug: string,
    state: any;
}

const initialStateSchema = new Schema<IInitialState>(
    {
        slug: {
            type: String
        },
        state: {
            type: Object
        },
    },
    { timestamps: true, strict: false }
);

export default models.InitialState || model('InitialState', initialStateSchema);
