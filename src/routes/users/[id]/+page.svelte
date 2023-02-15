<script>
	import { page } from '$app/stores';
	import AppBar from '$lib/components/chat/app_bar.svelte';
	import Profile from '$lib/components/home/profile.svelte';
	const { fetchedUser } = $page.data;
</script>

<div class="max-w-xl mx-auto">
	<AppBar />
	<Profile
		user={fetchedUser.user}
		followers={fetchedUser.followers}
		followings={fetchedUser.followings}
	/>
</div>
