import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;
	const url = `/api/rooms/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	const { success, room, messages } = data;

	console.log("chat page.ts data", data);
	return {
		room,
		messages
	};
};
