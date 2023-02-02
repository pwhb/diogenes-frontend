import mongoose, { type ObjectId } from 'mongoose';
import type { IGameTemplate } from './gameTemplate';
import gameTemplate from './gameTemplate';
import type { IUser } from './user';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IGame {
	_id: ObjectId;
	template: IGameTemplate;
	mode: string;
	players: IUser[];
	playerCount: number;
	createdBy: IUser;
}

const gameSchema = new Schema<IGame>(
	{
		template: {
			type: Schema.Types.ObjectId,
			ref: gameTemplate.modelName
		},
		mode: { type: String, default: 'casual' },
		players: [
			{
				type: Schema.Types.ObjectId,
				ref: user.modelName
			}
		],
		playerCount: { type: Number },
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: user.modelName
		}
	},
	{ timestamps: true }
);

export default models.Game || model('Game', gameSchema);
