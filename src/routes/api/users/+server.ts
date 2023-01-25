import dbConnect from '$lib/database/connectDB';
import clientConfig from '$lib/models/clientConfig';
import user from '$lib/models/user';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }: RequestEvent) => {
	try {
		await dbConnect();
		const q = url.searchParams.get('q');
		const isActive = url.searchParams.get('active');
		const users = await user
			.find({
				$and: [
					{ username: { $regex: q, $options: 'i' } },
					{ username: { $ne: locals.user.username } }
				],
				isActive
			})
			.select({ password: false, token: false, __v: false, updatedAt: false })
			.lean();
		return json({ data: users }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
