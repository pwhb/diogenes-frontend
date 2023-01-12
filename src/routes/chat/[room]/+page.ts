import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { room } = params;
	console.log('params', params);
	return {
		room
	};
};
