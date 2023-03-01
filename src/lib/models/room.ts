import mongoose from 'mongoose';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IRoom {
	members: [];
	type: string;
	isActive: boolean;
	name?: string;
	bookmarkedBy: [];
	lastMessage: object
}

const roomSchema = new Schema<IRoom>(
	{
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: user.modelName
			}
		],
		type: {
			type: String,
			default: 'private'
		},
		isActive: {
			type: Boolean,
			default: true
		},
		name: {
			type: String
		},
		bookmarkedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: user.modelName
			}
		],
		lastMessage: {
			type: Object
		}
	},
	{ timestamps: true }
);

export default models.Room || model('Room', roomSchema);
