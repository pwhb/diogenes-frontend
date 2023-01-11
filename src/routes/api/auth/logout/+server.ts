import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

// const logout: Action = async ({ cookies }) => {
//     cookies.delete("token")
//     // cookies.set("token", "", {
//     //     path: '/',
//     //     expires: new Date(0)
//     // })
//     throw redirect(302, '/welcome/login')
// }


export const GET: RequestHandler = ({ cookies }) => {
    cookies.delete("token")
    // cookies.set("token", "", {
    //     path: '/',
    //     expires: new Date(0)
    // })
    throw redirect(302, '/welcome/login')
}