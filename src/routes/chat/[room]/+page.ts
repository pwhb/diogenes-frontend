import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { room } = params;
	const url = `/api/rooms/${room}`;
	const res = await fetch(url);
	const data = await res.json();
	console.log('page.ts', data);
	return {
		room
	};
};
