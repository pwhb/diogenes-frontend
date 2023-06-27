
import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import { ObjectId } from "mongodb";
import { updateBody, validateBody } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, params }: RequestEvent) =>
{
	try
	{

		const { id } = params;
		const body = await request.json();

		const keys = ['name', 'modes', 'playerCounts', 'description', 'howToPlay', 'icon'];
		const update = updateBody(body, keys);

		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.GameTemplateCollection);
		const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: update });

		return json({ data: res }, { status: 201 });
	} catch (err)
	{
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};
