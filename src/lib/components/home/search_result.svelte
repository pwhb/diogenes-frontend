<script lang="ts">
	import type { IUser } from '$lib/models/user';
	import { followedStore } from '$lib/store/home';

	export let searchedUser: IUser;
	let loading = false;
	let alreadyFollowing = $followedStore && $followedStore.includes(searchedUser._id as never);

	const onClick = async () => {
		loading = true;
		if (!alreadyFollowing) {
			const url = `/api/users/${alreadyFollowing ? 'unfollow' : 'follow'}`;

			const payload = { id: searchedUser._id };
			const options = {
				method: 'POST',
				body: JSON.stringify(payload)
			};
			const res = await fetch(url, options);
			const { success } = await res.json();

			if (success) {
				alreadyFollowing = true;
				followedStore.update((prev) => {
					prev.push(searchedUser._id as never);
					return prev;
				});
			}
		}
		loading = false;
	};
</script>

<div class="p-3 flex flex-row justify-between">
	<p>{searchedUser.username}</p>
	<button
		class={loading ? 'btn btn-success btn-xs loading' : 'btn btn-success btn-xs'}
		disabled={alreadyFollowing || loading}
		on:click={onClick}
	>
		{#if !loading}
			{alreadyFollowing ? 'following' : 'follow'}
		{/if}
	</button>
</div>
