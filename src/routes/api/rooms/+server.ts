import dbConnect from '$lib/database/connectDB';
import message from '$lib/models/message';
import room from '$lib/models/room';

import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }: RequestEvent) => {
	try {
		const token = cookies.get('token') as string;
		if (!token) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const { _id } = decodeJwt(token) as IUser;

		await dbConnect();

		const rooms = await room
			.find({ members: _id })
			.populate('members', '_id username avatar')
			.lean();

		for (let room of rooms) {
			const lastMessage = await message.findOne({ room: room._id }).sort({ createdAt: -1 });
			room.lastMessage = lastMessage;
		}

		console.log('server rooms', rooms);
		return json({ success: true, rooms }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
