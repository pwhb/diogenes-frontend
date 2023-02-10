import dbConnect from '$lib/database/connectDB';
import gameTemplate from '$lib/models/gameTemplate';

import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		await dbConnect();
		const templates = await gameTemplate.find({}).select({}).lean();
		return json({ data: templates }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		await dbConnect();
		const {} = await request.json();
		const keys = [''];

		const users = await gameTemplate.find({}).select({}).lean();
		return json({ data: users }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
