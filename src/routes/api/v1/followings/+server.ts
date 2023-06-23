import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { ObjectId } from "mongodb";
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import clientPromise from '$lib/database/mongodb';
import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';


export const GET: RequestHandler = async ({ cookies, url }: RequestEvent) =>
{
	try
	{
		let userId = url.searchParams.get('id');
		let id;
		if (userId)
		{
			id = new ObjectId(userId);
		} else
		{
			const token = cookies.get('token') as string;
			if (!token)
			{
				return json({ success: false, error: 'unauthorized' }, { status: 401 });
			}
			const userFollowing = decodeJwt(token) as IUser;
			id = new ObjectId(userFollowing._id);
		}
		const client = await clientPromise;
		const col = client.db(DB_NAME).collection(DBKeys.FollowingCollection);

		const followings = await col.find({ follower: id }, { projection: { followed: 1 } }).toArray();

		const followers = await col.find({ followed: id }, { projection: { follower: 1 } }).toArray();


		return json({
			success: true,
			user: id,
			followers,
			followings
		}, { status: 200 });
	} catch (err)
	{
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
