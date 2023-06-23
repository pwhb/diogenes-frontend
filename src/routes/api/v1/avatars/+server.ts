import dbConnect from '$lib/database/connectDB';
import avatar from '$lib/models/avatar';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ }: RequestEvent) => {
    try {
        await dbConnect();

        const avatars = await avatar.find({ isActive: true }).select({ _id: false, createdAt: false, updatedAt: false, __v: false, isActive: false }).lean()
        const total = await avatar.find().countDocuments()
        return json({ data: avatars, total }, { status: 200 });
    } catch (err) {
        console.error(err);
        return json({ data: [], error: err }, { status: 400 });
    }
};

// export const POST: RequestHandler = async ({ request }: RequestEvent) => {
//     try {
//         await dbConnect();
//         const { name, path } = await request.json()
//         const created = await avatar.create({ name, path })
//         return json({ data: created }, { status: 200 });
//     } catch (err) {
//         console.error(err);
//         return json({ data: [], error: err }, { status: 400 });
//     }
// };