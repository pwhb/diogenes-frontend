
import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, }: RequestEvent) =>
{
    try
    {

        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.AvatarCollection);
        const filter: any = {};
        for (let [key, value] of url.searchParams)
        {
            filter[key] = value;
        }

        if (!!filter.active)
        {
            filter.active = filter.active === 'true';
        }

        const docs = await col.find(filter, { projection: { name: 1, type: 1, path: 1 } }).toArray();

        return json({ data: docs, total: docs.length }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return json({ data: [], error: err }, { status: 400 });
    }
};

