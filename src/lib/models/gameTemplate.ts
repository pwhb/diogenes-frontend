import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IGameTemplate {
	name: string;
	modes: string[];
	playerCounts: number[];
	description: string;
	howToPlay: string;
}

const gameTemplateSchema = new Schema<IGameTemplate>(
	{
		name: { type: String },
		modes: { type: [String], default: ['casual'] },
		playerCounts: { type: [Number] },
		description: { type: String },
		howToPlay: { type: String }
	},
	{ timestamps: true }
);

export default models.GameTemplate || model('GameTemplate', gameTemplateSchema);
