import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/welcome/login');
	}
	const { id } = params;
	const url = `/api/rooms/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	const { success, room, messages } = data;

	console.log('chat page.ts data', data);
	return {
		room,
		messages
	};
};
