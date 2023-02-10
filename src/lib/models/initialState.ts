import mongoose, { type ObjectId } from 'mongoose';
import gameTemplate from './gameTemplate';

const { Schema, model, models } = mongoose;

export interface IInitialState {
    _id: ObjectId;
    template: ObjectId,
}

const initialStateSchema = new Schema<IInitialState>(
    {
        template: {
            type: Schema.Types.ObjectId,
            ref: gameTemplate.modelName
        },
    },
    { timestamps: true, strict: false }
);

export default models.InitialState || model('InitialState', initialStateSchema);
