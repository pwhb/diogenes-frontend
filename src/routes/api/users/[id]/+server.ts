import dbConnect from '$lib/database/connectDB';
import user from '$lib/models/user';
import { getUpdateDocument } from '$lib/utils/validate';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ params }: RequestEvent) => {
    try {
        console.log("hellooooo", params);

        const { id } = params;
        await dbConnect();
        const fetchedUser = await user.findById(id).lean()
        return json({ success: true, user: fetchedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};

export const PATCH: RequestHandler = async ({ params, request }: RequestEvent) => {
    try {

        const { id } = params;
        const body = await request.json();
        const keys = ["avatar"]
        const update = getUpdateDocument(body, keys)
        await dbConnect();
        const updated = await user.findByIdAndUpdate(id, update, { new: true })
        return json({ success: true, user: updated }, { status: 201 });
    } catch (err) {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
}
