
import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ }: RequestEvent) =>
{
    try
    {
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.InitialStateCollection);
        const docs = await col.find().toArray();
        return json({ data: docs }, { status: 200 });
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
        const col = client.db(DB_NAME).collection(DBKeys.InitialStateCollection);
        const { slug, state } = await request.json();
        const doc = await col.insertOne({
            slug,
            state,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return json({ data: doc }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return json({ data: [], error: err }, { status: 400 });
    }
};