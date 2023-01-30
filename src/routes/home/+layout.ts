import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const url = `/api/followings`;
	const res = await fetch(url);
	const { followers, followings } = await res.json();

	return {
		followings,
		followers
	};
};
