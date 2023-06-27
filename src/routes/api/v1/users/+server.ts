import dbConnect from '$lib/database/connectDB';
import user, { type IUser } from '$lib/models/user';
import { decodeJwt, getJwt } from '$lib/utils/jwt';
import { updateBody } from '$lib/utils/validate';
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

export const PATCH: RequestHandler = async ({ request, cookies }: RequestEvent) => {
	try {
		const oldToken = cookies.get('token') as string;
		if (!oldToken) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const oldUser = decodeJwt(oldToken) as IUser;
		const body = await request.json();
		const keys = ["avatar", "username", "bio"]
		if (body.avatar && body.avatar.url) {
			body.avatar.url = body.avatar.url.replace("http://localhost:5173", "https://diogenes-web-git-test-pwhb.vercel.app")
		}
		const update = updateBody(body, keys)
		await dbConnect();

		const { _id, username, role, avatar, bio } = await user.findByIdAndUpdate(oldUser._id, update, { new: true })
		const token = getJwt({ _id, username, role, avatar, bio });

		cookies.set('token', token, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		return json({ success: true }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
}
