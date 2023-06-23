import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
	if (!locals.user) {
		throw redirect(302, '/welcome/login');
	}
	const { id } = params;
	const url1 = `/api/v0/users/${id}`
	const res1 = await fetch(url1)
	const { user } = await res1.json()

	const url2 = `/api/v0/followings?id=${id}`;
	const res2 = await fetch(url2);
	const { followers, followings } = await res2.json();

	console.log("server", { user, followers, followings })
	return {
		fetchedUser: {
			user,
			followers,
			followings
		}
	}

};
