<script>
	import { page } from '$app/stores';
	import Profile from '$lib/components/home/profile.svelte';
	const { user } = $page.data;
	console.log(user)
</script>

<Profile {user} />
