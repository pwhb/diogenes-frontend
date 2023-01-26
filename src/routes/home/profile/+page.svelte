<script>
	import { page } from '$app/stores';
	import Profile from '$lib/components/home/profile.svelte';
	const { user } = $page.data;

</script>

<Profile {user} />
