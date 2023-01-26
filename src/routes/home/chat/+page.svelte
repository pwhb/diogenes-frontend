<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/avatar.svelte';
	import type { IUser } from '$lib/models/user';

	const { rooms } = $page.data;

	console.log('chat', rooms);
	const getTheOtherUser = (members: IUser[]) => {
		for (let member of members) {
			if (member._id !== $page.data.user._id) {
				return member;
			}
		}

		return members[0];
	};
</script>

<div class="mx-16">
	<h1>Friend List</h1>

	{#if rooms}
		{#each rooms as { members, _id }}
			<a href={`/chat/${_id}`} class="p-3 flex flex-row gap-5 items-center">
				<Avatar user={getTheOtherUser(members)} />
				<div>
					<p class="text font-bold">{getTheOtherUser(members)?.username}</p>
					<p>old text</p>
				</div>
			</a>
		{/each}
	{:else}
		<p>Add some friends to chat</p>
	{/if}
</div>
