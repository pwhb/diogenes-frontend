import dbConnect from '$lib/database/connectDB';
import user from '$lib/models/user';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (!token) {
		return await resolve(event);
	}
	try {
		await dbConnect();
		const loggedInUser = await user
			.findOne({ token })
			.select({ _id: 0, username: 1, role: 1, avatar: 1 })
			.lean();
		console.log(loggedInUser);

		event.locals.user = loggedInUser;
	} catch (err) {
		console.error(err);
	}

	return await resolve(event);
};
