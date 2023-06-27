import dbConnect from '$lib/database/connectDB';
import user from '$lib/models/user';
import { getJwt } from '$lib/utils/jwt';
import { updateBody } from '$lib/utils/validate';
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

