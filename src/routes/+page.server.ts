import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(301, 'home');
	} else {
		throw redirect(302, 'welcome/login');
	}
};
