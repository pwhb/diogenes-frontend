import dbConnect from '$lib/database/connectDB';
import following from '$lib/models/following';
import room from '$lib/models/room';
// import room from '$lib/models/room';
import type { IUser } from '$lib/models/user';
import user from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }: RequestEvent) => {
	try {
		const token = cookies.get('token') as string;
		if (!token) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const userFollowing = decodeJwt(token) as IUser;

		const { id } = await request.json();

		const userFollowed = await user.exists({ _id: id });

		if (!userFollowed) {
			return json({ success: false, error: 'invalid id' }, { status: 400 });
		}
		await dbConnect();

		const newFollowing = await following.findOneAndUpdate(
			{
				followed: id,
				follower: userFollowing._id
			},
			{ followed: id, follower: userFollowing._id },
			{ upsert: true, setDefaultsOnInsert: true, new: true }
		);

		console.log('new following', newFollowing);

		const isFollowed = await following.exists({
			followed: userFollowing._id,
			follower: id
		});

		if (isFollowed) {
			const oldRoom = await room.findOne({
				members: { $all: [id, userFollowing._id] },
				type: 'private'
			});

			if (!oldRoom) {
				const newRoom = await room.create({ members: [id, userFollowing._id] });
				console.log('a beginning of a friendship', newRoom);
			}
		}

		return json({ success: true, following: newFollowing, isFollowed }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
