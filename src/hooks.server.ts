import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import type { Handle } from '@sveltejs/kit';
import { ObjectId } from "mongodb";
export const handle: Handle = async ({ event, resolve }) =>
{
	const token = event.cookies.get('token');
	if (!token)
	{
		return await resolve(event);
	}
	try
	{
		const loggedInUser = decodeJwt(token) as IUser;
		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
		const doc = await col.findOne({ _id: new ObjectId(loggedInUser._id) }, {
			projection: { username: 1, avatar: 1, role: 1 }
		});
		event.locals.user = doc as unknown as IUser;
	} catch (err)
	{
		console.error(err);
	}

	return await resolve(event);
};
