import dbConnect from '$lib/database/connectDB';
import game from '$lib/models/game';
import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { validateBody } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }: RequestEvent) => {
	try {
		const token = cookies.get('token') as string;
		if (!token) {
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const player = decodeJwt(token) as IUser;

		await dbConnect();
		const body = await request.json();
		const { template, mode, playerCount } = body;
		const keys = ['template', 'mode', 'playerCount'];
		if (!validateBody(body, keys)) {
			return json({ message: 'invalid params', keys }, { status: 400 });
		}

		const newGame = await game.create({
			template,
			mode,
			players: [player._id],
			playerCount,
			createdBy: player._id
		});

		return json({ game: newGame }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
