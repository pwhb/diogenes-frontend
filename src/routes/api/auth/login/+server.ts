import dbConnect from "$lib/database/connectDB";
import user from "$lib/models/user";
import { decodeJwt, getJwt } from "$lib/utils/jwt";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import { verify } from "argon2"

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        await dbConnect()

        const { username, password } = await request.json()

        const oldUser = await user.findOne({ username })
        if (!oldUser) {
            return json(
                { message: "invalid username" },
                { status: 400 }
            )
        }


        const isCorrect = await verify(oldUser.password, password)

        if (!isCorrect) {
            return json(
                { message: "invalid password" },
                { status: 400 }
            )
        }

        const token = getJwt({ _id: oldUser._id, username })
        const decoded = decodeJwt(token)

        return json(
            {
                message: "welcome back to diogenes",
                data: {
                    _id: oldUser._id, username
                },
                token,
                decoded

            },
            { status: 200 }
        )
    } catch (err) {
        console.error(err)
        return json({ error: err }, { status: 400 })
    }

}