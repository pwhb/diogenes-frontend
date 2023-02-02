<script lang="ts">
	import SearchBar from '$lib/components/home/search_bar.svelte';
	import { followerStore, followedStore } from '$lib/store/home';
</script>

<div class="mx-16">
	<h1>Search Friends</h1>
	<SearchBar />
</div>
