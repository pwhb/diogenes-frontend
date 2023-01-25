<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';

	const { user } = $page.data;
	export let searchedUser: IUser;
	let alreadyFollowing = user.following && user.following.includes(searchedUser._id);

	const onClick = async () => {
		if (!alreadyFollowing) {
			console.log(`${user.username} is following ${searchedUser.username}`);
			const url = `/api/users/${alreadyFollowing ? 'unfollow' : 'follow'}`;

			const payload = { id: searchedUser._id };
			const options = {
				method: 'POST',
				body: JSON.stringify(payload)
			};
			const res = await fetch(url, options);
			const { follow } = await res.json();

			if (follow) {
				alreadyFollowing = true;
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
