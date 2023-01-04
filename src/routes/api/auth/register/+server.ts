import dbConnect from "$lib/database/connectDB";
import user from "$lib/models/user";
import { decodeJwt, getJwt } from "$lib/utils/jwt";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import { hash, verify } from "argon2"

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        await dbConnect()

        const { username, password } = await request.json()

        const oldUser = await user.findOne({ username })
        if (oldUser) {
            return json(
                { message: "username already taken" },
                { status: 400 }
            )
        }

        const hashedPassword = await hash(password)
        // const isCorrect = await verify(hashedPassword, password)
        const { _id } = await user.create({ username, password: hashedPassword })

        const token = getJwt({ _id, username })
        const decoded = decodeJwt(token)

        return json(
            {
                message: "welcome to diogenes",
                data: {
                    _id, username
                },
                token,
                decoded

            },
            { status: 201 }
        )
    } catch (err) {
        console.error(err)
        return json({ error: err }, { status: 400 })
    }

}