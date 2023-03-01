import mongoose, { type ObjectId } from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IUser {
	username: string;
	password: string;
	email?: string;
	avatar?: {
		url: string,
		type?: string,
		border?: string
	};
	banner?: string;
	bio?: string;
	isActive: boolean;
	role: string;
	// rooms: [];
	// followed: [];
	// following: [];
	// token: string;
	_id: ObjectId;
}

const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String, required: false },
		avatar: { type: Object, required: false },
		banner: { type: String, required: false },
		bio: { type: String, required: false },
		isActive: { type: Boolean, required: true, default: true },
		role: { type: String, required: true, default: 'player' }
		// rooms: { type: [Schema.Types.ObjectId], default: [], ref: room.modelName },
		// followed: { type: [Schema.Types.ObjectId], default: [], ref: 'User' },
		// following: { type: [Schema.Types.ObjectId], default: [], ref: 'User' },
		// token: { type: String, required: true }
	},
	{ timestamps: true }
);

export default models.User || model('User', userSchema);
