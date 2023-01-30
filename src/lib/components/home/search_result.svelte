<script lang="ts">
	import type { IUser } from '$lib/models/user';
	import { followedStore } from '$lib/store/home';

	export let searchedUser: IUser;
	let alreadyFollowing = $followedStore && $followedStore.includes(searchedUser._id as never);

	const onClick = async () => {
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
	};
</script>

<div class="p-3 flex flex-row justify-between">
	<p>{searchedUser.username}</p>
	<button class="btn btn-success btn-xs" disabled={alreadyFollowing} on:click={onClick}
		>{alreadyFollowing ? 'following' : 'follow'}</button
	>
</div>
