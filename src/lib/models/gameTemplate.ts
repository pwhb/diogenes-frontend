import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IGameTemplate {
	name: string;
	slug: string;
	modes: string[];
	playerCounts: number[];
	description: string;
	howToPlay: string;
	icon: string;
	isActive: boolean;
	canPlayWithAI: boolean;
}

const gameTemplateSchema = new Schema<IGameTemplate>(
	{
		name: { type: String },
		slug: { type: String },
		modes: { type: [String], default: ['casual'] },
		playerCounts: { type: [Number] },
		description: { type: String },
		howToPlay: { type: String },
		icon: { type: String },
		isActive: { type: Boolean, default: true },
		canPlayWithAI: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

gameTemplateSchema.pre('save', function (next) {
	this.slug = this.name.split(' ').join('-');
	next();
});

export default models.GameTemplate || model('GameTemplate', gameTemplateSchema);
