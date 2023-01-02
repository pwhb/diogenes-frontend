import { clientPromise } from "$lib/database/client";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
    console.log("chat")
    const client = await clientPromise
    const res = await client.db("test").collection("test").insertOne({ user1: "user1", user2: "user2", message: { body: "hello world" } })
    console.log(res)
    return json({ url }, { status: 201 })
}