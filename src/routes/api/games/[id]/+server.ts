import dbConnect from '$lib/database/connectDB';
import game from '$lib/models/game';
import message from '$lib/models/message';
import room from '$lib/models/room';

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

		const fetchedGame = await game.findOne({ _id: new mongoose.Types.ObjectId(id), players: _id });

		if (!fetchedGame) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}

		return json({ success: true, game: fetchedGame }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
