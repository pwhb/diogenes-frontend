import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

export interface IUser {
    username: string;
    password: string;
    email?: string;
    avatar?: string;
    banner?: string;
    bio?: string;
    isActive: boolean;
    role: string;
    token: string;
}


const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    avatar: { type: String, required: false },
    banner: { type: String, required: false },
    bio: { type: String, required: false },
    isActive: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: "player" },
    token: { type: String, required: true },
}, { timestamps: true });

export default models.User || model('User', userSchema)