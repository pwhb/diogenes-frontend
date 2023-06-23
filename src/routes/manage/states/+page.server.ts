import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, }) => {

    const url1 = `/api/v0/initState`;
    const res1 = await fetch(url1);
    const data1 = await res1.json();
    console.log(data1)

    const url2 = '/api/v0/templates';
    const res2 = await fetch(url2);
    const data2 = await res2.json();
    const { templates } = data2;

    return {
        initStates: data1,
        templates
    };
};
