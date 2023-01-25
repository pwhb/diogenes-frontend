import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IRoom {
	members: [];
	type: string;
	isActive: true;
}

const roomSchema = new Schema<IRoom>(
	{
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		type: {
			type: String,
			default: 'private'
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export default models.Room || model('Room', roomSchema);
