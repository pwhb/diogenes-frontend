import { decodeJwt } from "$lib/utils/jwt";
import type { Handle } from "@sveltejs/kit";



export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("token")
    if (!token) {
        return await resolve(event)
    }
    try {
        console.log("token", token)
        const user = decodeJwt(token)
        console.log("user", user)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        event.locals.user = user

    } catch (err) {
        console.error(err)
    }


    return await resolve(event)
} 