import mongoose, { type ObjectId } from 'mongoose';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IFollowing {
	followed: ObjectId;
	follower: ObjectId;
	isActive: true;
}

const followingSchema = new Schema<IFollowing>(
	{
		followed: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		follower: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export default models.Following || model('Following', followingSchema);
