import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/welcome/login');
	}
	const { id } = params;
	const url1 = `/api/games/${id}`;
	const res1 = await fetch(url1);
	const data1 = await res1.json();
	const { success, game } = data1;

	return {
		game
	};
};
