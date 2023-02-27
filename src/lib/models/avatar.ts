import mongoose, { type ObjectId } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IAvatar {
    _id: ObjectId;
    name: string;
    type: string;
    path: string;
}

const avatarSchema = new Schema<IAvatar>(
    {
        name: { type: String },
        type: { type: String, default: "original" },
        path: { type: String }
    },
    { timestamps: true }
);

export default models.Avatar || model('Avatar', avatarSchema);
