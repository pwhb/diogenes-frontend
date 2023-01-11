import { fail, redirect } from "@sveltejs/kit"
import type { Action, Actions } from "./$types"
import user from "$lib/models/user";
import { getJwt } from "$lib/utils/jwt";
import { verify } from "argon2"
import dbConnect from "$lib/database/connectDB";

const login: Action = async ({ request, cookies }) => {
    const data = await request.formData()
    const { username, password } = Object.fromEntries(data)

    const invalid = { username: "", password: "" }
    const previous = { username }
    if (!username) {
        invalid.username = "username cannot be empty"
    }
    if (!password) {
        invalid.password = "password cannot be empty"
    }

    if (invalid.username || invalid.password) {
        return fail(400, { invalid, previous })
    }

    await dbConnect()

    const oldUser = await user.findOne({ username })
    if (!oldUser) {
        invalid.username = "user doesn't exist"
        return fail(400, { invalid, previous })
    }

    const isCorrect = await verify(oldUser.password, password as string)

    if (!isCorrect) {
        invalid.password = "wrong password"
        return fail(400, { invalid, previous })
    }

    const { token } = await user.findByIdAndUpdate(oldUser._id, { token: crypto.randomUUID() })

    cookies.set("token", token, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
    })



    throw redirect(303, '/home')
}

export const actions: Actions = {
    login
}