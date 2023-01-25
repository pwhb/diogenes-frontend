import dbConnect from '$lib/database/connectDB';
import room from '$lib/models/room';
import user from '$lib/models/user';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	try {
		await dbConnect();
		const { username } = locals.user;
		const { id } = await request.json();
		console.log(`${username} wants to follows ${id}`);

		const userFollowing = await user.findOne({ username });
		const userFollowed = await user.findById(id);
		if (!userFollowed) {
			return json({ message: "user you're trying to follow doesn't exist." }, { status: 404 });
		}
		if (userFollowing.following && !userFollowing.following.includes(userFollowed._id)) {
			userFollowing.following.push(userFollowed._id);
		} else {
			userFollowing.following = [userFollowed._id];
		}

		if (userFollowed.following && userFollowed.following.includes(userFollowing._id)) {
			if (userFollowed.friends && !userFollowed.friends.includes(userFollowing._id)) {
				userFollowed.friends.push(userFollowing._id);
			} else {
				userFollowed.friends = [userFollowing._id];
			}

			if (userFollowing.friends && !userFollowing.friends.includes(userFollowed._id)) {
				userFollowing.friends.push(userFollowed._id);
			} else {
				userFollowing.friends = [userFollowed._id];
			}

			const newRoom = await room.create({ members: [userFollowed._id, userFollowing._id] });

			if (userFollowed.rooms) {
				userFollowed.rooms.push(newRoom._id);
			} else {
				userFollowed.rooms = [newRoom._id];
			}

			if (userFollowing.rooms) {
				userFollowing.rooms.push(newRoom._id);
			} else {
				userFollowing.rooms = [newRoom._id];
			}
		}

		await userFollowed.save();
		await userFollowing.save();
		return json({ userFollowed, userFollowing }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
