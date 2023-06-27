import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';

import { validateBody } from '$lib/utils/validate';

import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
{
	try
	{
		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.GameTemplateCollection);
		const docs = await col.find({ active: true }, {
			projection:
			{
				createdAt: -1,
				updatedAt: -1
			}
		}).toArray();
		return json({ success: true, docs }, { status: 200 });
	} catch (err)
	{
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) =>
{
	try
	{
		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.GameTemplateCollection);
		const body = await request.json();
		const { name, modes, playerCounts, description, howToPlay } = body;
		const keys = ['name', 'modes', 'playerCounts', 'description', 'howToPlay', 'icon'];
		if (!validateBody(body, keys))
		{
			return json({ message: 'invalid params', keys }, { status: 400 });
		}

		const doc = await col.insertOne({
			name,
			modes,
			playerCounts,
			description,
			howToPlay,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		return json({ data: doc }, { status: 201 });
	} catch (err)
	{
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
