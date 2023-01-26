import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const url = `/api/followings`;
	const res = await fetch(url);
	const { followers, followings } = await res.json();

	return {
		followings,
		followers
	};
};
