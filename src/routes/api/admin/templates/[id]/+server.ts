import dbConnect from '$lib/database/connectDB';
import gameTemplate from '$lib/models/gameTemplate';
import { getUpdateDocument, validateBody } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, params }: RequestEvent) => {
	try {
		await dbConnect();
		const { id } = params;
		const body = await request.json();

		const keys = ['name', 'modes', 'playerCounts', 'description', 'howToPlay'];
		const update = getUpdateDocument(body, keys);

		const template = await gameTemplate.findByIdAndUpdate(id, update, { new: true });

		return json({ data: template }, { status: 201 });
	} catch (err) {
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
