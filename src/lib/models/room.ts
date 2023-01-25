import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface IRoom {
	members: [];
	type: string;
	isActive: true;
}

const roomSchema = new Schema<IRoom>(
	{
		members: {
			type: [Schema.Types.ObjectId],
			default: []
		},
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

// const roomSchema = mongoose.Schema({
// 	user1: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'Room'
// 	},
// 	user2: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: true,
// 		ref: 'Room'
// 	},
// 	user1SuperLikeUser2: Boolean,
// 	user2SuperLikeUser1: Boolean,
// 	matchedAt: { type: Date, default: new Date() },
// 	lastUpdatedAt: { type: Date, default: new Date() }
// });

// const Room = mongoose.model('Room', roomSchema);

// export default Room;
