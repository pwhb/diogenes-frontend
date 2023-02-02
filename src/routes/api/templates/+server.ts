import dbConnect from '$lib/database/connectDB';
import gameTemplate from '$lib/models/gameTemplate';
import { validateBody } from '$lib/utils/validate';

import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		await dbConnect();
		const templates = await gameTemplate.find({}).select({}).lean();
		return json({ success: true, templates }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		await dbConnect();
		const body = await request.json();
		const { name, modes, playerCounts, description, howToPlay } = body;
		const keys = ['name', 'modes', 'playerCounts', 'description', 'howToPlay', 'icon'];
		if (!validateBody(body, keys)) {
			return json({ message: 'invalid params', keys }, { status: 400 });
		}

		const template = await gameTemplate.create({
			name,
			modes,
			playerCounts,
			description,
			howToPlay
		});

		return json({ data: template }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
