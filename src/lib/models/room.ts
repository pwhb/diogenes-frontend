import mongoose from 'mongoose';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IRoom {
	members: [];
	concat: string;
	type: string;
	isActive: true;
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
		concat: {
			type: String
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export default models.Room || model('Room', roomSchema);
