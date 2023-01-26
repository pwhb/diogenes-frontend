import { usersfollowed, usersfollowing } from '$lib/store/home';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const url = `/api/followings`;
	const res = await fetch(url);
	const { success, followers, followings } = await res.json();

	return {
		followings,
		followers
	};
};
