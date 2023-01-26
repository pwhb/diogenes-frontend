<script lang="ts">
	import { page } from '$app/stores';
	import BottomNavigator from '$lib/components/bottom_navigator.svelte';
	import { usersfollowed, usersfollowing } from '$lib/store/home';

	const { followers, followings } = $page.data;

	usersfollowed.set(followers.map((following: any) => following.follower));
	usersfollowing.set(followings.map((following: any) => following.followed));
</script>

<div class="max-w-xl mx-auto">
	<slot />
	<BottomNavigator />
</div>
