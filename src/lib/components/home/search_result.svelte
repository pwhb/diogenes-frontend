<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';

	const { user } = $page.data;
	export let searchedUser: IUser;
	let alreadyFollowing = user.following && user.following.includes(searchedUser._id);
	// const getButtonText = () => {
	// 	if (user.following && user.following.includes(searchedUser._id)) {
	// 		return 'unfollow';
	// 	}

	// 	return 'follow';
	// };

	const onClick = async () => {
		console.log(`${user.username} is following ${searchedUser.username}`);
		const url = `/api/users/follow`;

		const payload = { id: searchedUser._id };
		const options = {
			method: 'POST',
			body: JSON.stringify(payload)
		};
		const res = await fetch(url, options);
		const { data } = await res.json();

		if (data) {
			console.log('followed result', data);
		}
	};
</script>

<div class="p-3 flex flex-row justify-between">
	<p>{searchedUser.username}</p>
	<button class="btn btn-success btn-xs" on:click={onClick}
		>{alreadyFollowing ? 'unfollow' : 'follow'}</button
	>
</div>
