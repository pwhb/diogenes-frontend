import mongoose, { type ObjectId } from 'mongoose';
import game, { type IGame } from './game';
import room from './room';
import user, { type IUser } from './user';

const { Schema, model, models } = mongoose;

export interface IMessage {
	new: boolean;
	_id: ObjectId;
	room: ObjectId;
	sender: IUser;
	body: string;
	type: string;
	createdAt: Date;
	game?: IGame;
}

const messageSchema = new Schema<IMessage>(
	{
		room: {
			type: Schema.Types.ObjectId,
			ref: room.modelName
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		body: {
			type: String
		},
		game: {
			type: Schema.Types.ObjectId,
			ref: game.modelName
		},
		type: {
			type: String,
			default: 'text'
		}
	},
	{ timestamps: true }
);

export default models.Message || model('Message', messageSchema);
