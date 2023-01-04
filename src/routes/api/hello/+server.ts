
import dbConnect from "$lib/database/connectDB";
import clientConfig from "$lib/models/clientConfig";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    await dbConnect()
    // const config = await clientConfig.create({ name: "diogenes client production" })
    const { name } = await clientConfig.findById(import.meta.env.VITE_CONFIG_ID)
    return json({ name }, { status: 201 })
}