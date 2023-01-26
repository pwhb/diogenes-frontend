import type { LayoutServerLoad } from './$types';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	return {
		user: locals.user ? JSON.parse(JSON.stringify(locals.user)) : null
	};
};
