import dbConnect from '$lib/database/connectDB';
import game from '$lib/models/game';
import { validateBody } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		await dbConnect();
		const body = await request.json();
		const { template, mode, players, playerCount } = body;
		const keys = ['template', 'mode', 'players', 'playerCount'];
		if (!validateBody(body, keys)) {
			return json({ message: 'invalid params', keys }, { status: 400 });
		}

		const newGame = await game.create({
			template,
			mode,
			players,
			playerCount
		});

		return json({ data: newGame }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
