<script>
	import { page } from '$app/stores';
	import Select from '$lib/components/admin/select.svelte';

	const { templates } = $page.data;
    console.log(templates)
</script>

<h1>manage init</h1>

<Select choices={templates.map((/** @type {{ name: any; _id: any; }} */ v) => {
    return {
        label:v.name,
        value:v._id
    }
})} />