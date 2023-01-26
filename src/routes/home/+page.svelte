<script lang="ts">
	import SearchBar from '$lib/components/home/search_bar.svelte';
	import { usersfollowed, usersfollowing } from '$lib/store/home';

	console.log('home page', {
		$usersfollowed,
		$usersfollowing
	});
</script>

<div class="mx-16">
	<h1>Search Friends</h1>
	<SearchBar />
</div>
