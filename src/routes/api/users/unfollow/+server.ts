import dbConnect from '$lib/database/connectDB';
import user from '$lib/models/user';
import { checkAndSafePop } from '$lib/utils/array';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	try {
		await dbConnect();
		const { username } = locals.user;
		const { id } = await request.json();
		console.log(`${username} wants to unfollow ${id}`);

		const userFollowing = await user.findOne({ username });
		const userFollowed = await user.findById(id);
		if (!userFollowed) {
			return json({ message: "user you're trying to unfollow doesn't exist." }, { status: 404 });
		}

		checkAndSafePop(userFollowing.following, userFollowed._id);

		await userFollowed.save();
		await userFollowing.save();
		return json({ userFollowed, userFollowing }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
