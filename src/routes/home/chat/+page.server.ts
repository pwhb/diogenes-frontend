import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const url = `/api/rooms`;
	const res = await fetch(url);
	const { rooms } = await res.json();
	return {
		rooms
	};
};
