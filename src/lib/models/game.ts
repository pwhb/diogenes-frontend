import mongoose from 'mongoose';
import type { IGameTemplate } from './gameTemplate';
import gameTemplate from './gameTemplate';
import type { IUser } from './user';
import user from './user';

const { Schema, model, models } = mongoose;

export interface IGame {
	template: IGameTemplate;
	mode: string;
	players: IUser[];
	playerCount: number;
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
		playerCount: { type: Number }
	},
	{ timestamps: true }
);



export default models.Game || model('Game', gameSchema);
