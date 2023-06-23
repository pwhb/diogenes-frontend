import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
{
	try
	{
		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.GameTemplateCollection);

		const docs = await col.find({}, { projection: {} }).toArray();
		return json({ data: docs }, { status: 200 });
	} catch (err)
	{
		console.error(err);
		return json({ data: [], error: err }, { status: 400 });
	}
};


