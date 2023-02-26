import mongoose, { type ObjectId } from 'mongoose';
import type { IGameTemplate } from './gameTemplate';
import gameTemplate from './gameTemplate';
import type { IRoom } from './room';
import room from './room';
import type { IUser } from './user';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IGame {
	_id: ObjectId;
	template: IGameTemplate;
	mode: string;
	status: string;
	players: IUser[];
	playerCount: number;
	createdBy: IUser;
	room: IRoom,
	state: object
}

const gameSchema = new Schema<IGame>(
	{
		template: {
			type: Schema.Types.ObjectId,
			ref: gameTemplate.modelName
		},
		mode: { type: String, default: 'casual' },
		status: { type: String, default: 'pending' },
		players: [
			{
				type: Schema.Types.ObjectId,
				ref: user.modelName
			}
		],
		room: {
			type: Schema.Types.ObjectId,
			ref: room.modelName
		},
		playerCount: { type: Number },
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		},
		state: {
			type: Object
		}
	},
	{ timestamps: true }
);

export default models.Game || model('Game', gameSchema);
