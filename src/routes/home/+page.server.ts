import type { IUser } from '$lib/models/user';
import { usersfollowed, usersfollowing } from '$lib/store/home';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/welcome/login');
	}
};
