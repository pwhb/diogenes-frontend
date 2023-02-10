import dbConnect from '$lib/database/connectDB';
import game from '$lib/models/game';
import message from '$lib/models/message';
import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const GET: RequestHandler = async ({ cookies, params }: RequestEvent) => {
	try {
		const token = cookies.get('token') as string;
		if (!token) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const { _id } = decodeJwt(token) as IUser;
		const { id } = params;
		await dbConnect();

		// const doc = await game.findByIdAndUpdate(
		// 	{ _id: new mongoose.Types.ObjectId(id), players: _id },
		// 	{ $push: { players: _id } },
		// 	{ new: true, upsert: true, setDefaultsOnInsert: true });
		const doc = await game.findById(id).populate({ path: 'template' });
		if (!doc) {
			return json({ success: false, message: 'game not found' }, { status: 404 });
		}

		if (!doc.players.includes(_id)) {
			doc.players.push(_id);
			if (doc.status === 'pending' && doc.players.length === doc.playerCount) {
				doc.status = 'started';
			}
			await doc.save();
			return json({ success: true, updated: true, game: doc }, { status: 200 });
		}
		const messages = await message
			.find({ room: new mongoose.Types.ObjectId(id) })
			.lean()
			.populate({
				path: 'sender'
			})
			.populate({
				path: 'game',
				populate: {
					path: 'template'
				}
			});

		return json({ success: true, updated: false, game: doc, messages }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
