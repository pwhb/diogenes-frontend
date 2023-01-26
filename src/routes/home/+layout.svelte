<script lang="ts">
	import { page } from '$app/stores';
	import BottomNavigator from '$lib/components/bottom_navigator.svelte';
	import AppBar from '$lib/components/chat/app_bar.svelte';
	import { followerStore, followedStore } from '$lib/store/home';

	const { followers, followings } = $page.data;

	followerStore.set(followers.map((following: any) => following.follower));
	followedStore.set(followings.map((following: any) => following.followed));
</script>

<div class="max-w-xl mx-auto">
	<AppBar />
	<slot />
	<BottomNavigator />
</div>
