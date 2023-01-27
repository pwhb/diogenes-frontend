import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;
	const url = `/api/rooms/${id}`;
	const res = await fetch(url);
	const { room } = await res.json();
	return {
		room
	};
};
