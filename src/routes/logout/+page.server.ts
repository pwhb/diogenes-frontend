import { redirect } from "@sveltejs/kit"
import type { Action, Actions } from "./$types"


const logout: Action = async ({ cookies }) => {
    cookies.delete("token")
    // cookies.set("token", "", {
    //     path: '/',
    //     expires: new Date(0)
    // })
    throw redirect(302, '/welcome/login')
}

export const actions: Actions = {
    default: logout
}