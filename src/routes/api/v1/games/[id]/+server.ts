import { DB_NAME } from '$env/static/private';
import DBKeys from '$lib/consts/DBKeys';
import clientPromise from '$lib/database/mongodb';
import { ObjectId } from "mongodb";
import type { IUser } from '$lib/models/user';
import { decodeJwt } from '$lib/utils/jwt';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import type { IInitialState } from '$lib/models/initialState';


export const GET: RequestHandler = async ({ cookies, params }: RequestEvent) =>
{
	try
	{
		const token = cookies.get('token') as string;
		if (!token)
		{
			return json({ success: false, error: 'unauthorized' }, { status: 401 });
		}
		const { _id } = decodeJwt(token) as IUser;
		const id = new ObjectId(params.id);
		const client = await clientPromise;
		const db = client.db(DB_NAME);
		const gameCol = db.collection(DBKeys.GameCollection);
		const doc = (await gameCol.aggregate([
			{
				$match: { _id: id },
			},
			{
				$lookup: {
					from: 'users',
					localField: 'players',
					foreignField: '_id',
					as: 'players'
				}
			},
			{
				$limit: 1
			}
		]).toArray())[0];

		if (!doc)
		{
			return json({ success: false, message: 'game not found' }, { status: 404 });
		}
		const players = doc.players.map((player: any) => player._id);
		if (!players.includes(_id))
		{
			console.log("not include", { doc, _id });
			await gameCol.updateOne({ _id: id }, {
				$push: { players: _id }
			});
			if (doc.status === 'pending' && doc.players.length === doc.playerCount)
			{
				doc.status = 'started';
				const { slug } = doc.template;
				const initialStates = db.collection(DBKeys.InitialStateCollection);
				const { state } = await initialStates.findOne({ slug }) as unknown as IInitialState;
				if (slug === "guess-the-number")
				{
					// 0-99
					state.secretNumber = Math.floor(Math.random() * 100);
				}
				doc.state = state;
			}
			await doc.save();
			return json({ success: true, updated: true, game: doc }, { status: 200 });
		}


		//  await doc.populate({ path: "players" });
		const msgCol = db.collection(DBKeys.GameCollection);
		const messages = msgCol.aggregate([
			{
				$match: { room: id },
			}
		]);
		//  await msgCol
		// 	.find({ room: id })
		// 	.lean()
		// 	.populate({
		// 		path: 'sender'
		// 	})
		// 	.populate({
		// 		path: 'game',
		// 		populate: {
		// 			path: 'template'
		// 		}
		// 	});

		return json({ success: true, updated: false, game: doc, messages }, { status: 200 });
	} catch (err)
	{
		console.error(err);
		return json({ success: false, error: err }, { status: 400 });
	}
};
