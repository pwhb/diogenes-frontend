import dbConnect from '$lib/database/connectDB';
import following from '$lib/models/following';

import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const GET: RequestHandler = async ({ cookies, url }: RequestEvent) => {
	try {
		let userId = url.searchParams.get('id');
		let id;
		if (userId) {
			id = new mongoose.Types.ObjectId(userId);
		} else {
			const token = cookies.get('token') as string;
			if (!token) {
				return json({ success: false, error: 'unauthorized' }, { status: 401 });
			}
			const userFollowing = decodeJwt(token) as IUser;
			id = userFollowing._id;
		}

		await dbConnect();
		const followings = await following.find({ follower: id }).select({ followed: true }).lean();
		const followers = await following.find({ followed: id }).select({ follower: true }).lean();

		return json({ success: true, followers, followings }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
