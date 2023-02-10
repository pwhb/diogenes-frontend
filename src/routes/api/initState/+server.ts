import dbConnect from '$lib/database/connectDB';
import initialState from '$lib/models/initialState';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ }: RequestEvent) => {
    try {
        await dbConnect();
        const initStates = await initialState.find().lean()
        return json({ data: initStates }, { status: 200 });
    } catch (err) {
        console.error(err);
        return json({ data: [], error: err }, { status: 400 });
    }
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        await dbConnect();
        const { template, state } = await request.json()
        const initState = await initialState.create({ template, state })
        return json({ data: initState }, { status: 200 });
    } catch (err) {
        console.error(err);
        return json({ data: [], error: err }, { status: 400 });
    }
};