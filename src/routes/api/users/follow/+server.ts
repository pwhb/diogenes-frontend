import dbConnect from '$lib/database/connectDB';
import room from '$lib/models/room';
import user from '$lib/models/user';
import { checkAndSafePush, safePush } from '$lib/utils/array';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	try {
		await dbConnect();

		const response = { follow: false, friend: false, success: false };
		const { username } = locals.user;
		const { id } = await request.json();
		console.log(`${username} wants to follow ${id}`);

		const userFollowing = await user.findOne({ username });
		const userFollowed = await user.findById(id);
		if (!userFollowed) {
			return json({ message: "user you're trying to follow doesn't exist." }, { status: 404 });
		}

		checkAndSafePush(userFollowing.following, userFollowed._id);
		checkAndSafePush(userFollowed.followed, userFollowing._id);
		response.follow = true;

		if (userFollowed.following && userFollowed.following.includes(userFollowing._id)) {
			checkAndSafePush(userFollowed.friends, userFollowing._id);
			checkAndSafePush(userFollowing.friends, userFollowed._id);

			const newRoom = await room.create({ members: [userFollowed._id, userFollowing._id] });
			safePush(userFollowed.rooms, newRoom._id);
			safePush(userFollowing.rooms, newRoom._id);
			response.friend = true;
		}

		await userFollowed.save();
		await userFollowing.save();

		response.success = true;
		return json(response, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
