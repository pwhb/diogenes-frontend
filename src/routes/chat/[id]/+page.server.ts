import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/welcome/login');
	}
	const { id } = params;
	const url1 = `/api/rooms/${id}`;
	const res1 = await fetch(url1);
	const data1 = await res1.json();
	const { success, room, messages } = data1;

	const url2 = '/api/templates';
	const res2 = await fetch(url2);
	const data2 = await res2.json();
	const { templates } = data2;
	console.log('chat page.ts data1', data1, data2);
	return {
		room,
		messages,
		templates
	};
};
