<script>
	import { searchResults } from '$lib/store/home';
	import Icon from '@iconify/svelte';
	import SearchResult from './search_result.svelte';
	let searchInput = '';
	let loading = false;

	const searchUser = async () => {
		loading = true
		const url = `/api/users?q=${searchInput}&active=true`;
		const res = await fetch(url);
		const { data } = await res.json();

		if (data) {
			searchResults.set(data);
		}
		loading = false
	};
</script>

<div class="form-control">
	<div class="input-group">
		<input
			type="text"
			placeholder="Search…"
			class="input input-bordered w-full"
			bind:value={searchInput}
		/>
		<button disabled={loading} class={loading ? 'btn btn-square loading' : 'btn btn-square'} on:click={searchUser}>
			{#if !loading}
				<Icon icon="material-symbols:person-search-rounded" width="24" />
			{/if}
		</button>
	</div>
</div>

{#if $searchResults}
	<div class="card bg-base-100 mt-4 shadow-xl ">
		{#each $searchResults as result}
			<SearchResult searchedUser={result} />
			<!-- <div class="p-3 flex flex-row justify-between">
				<p>{result.username}</p>
				<button class="btn btn-success btn-xs">follow</button>
			</div> -->
		{/each}
	</div>
{/if}
