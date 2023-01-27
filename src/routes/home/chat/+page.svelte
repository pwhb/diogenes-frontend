<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/components/common/avatar.svelte';
	import { getTheOtherUser } from '$lib/utils/get';

	const { rooms, user } = $page.data;

	console.log('chat', rooms);
</script>

<div class="mx-16">
	<h1>Friend List</h1>

	{#if rooms}
		{#each rooms as { members, _id }}
			<a href={`/chat/${_id}`} class="p-3 flex flex-row gap-5 items-center">
				<Avatar user={getTheOtherUser(members, user._id)}/>
				<div>
					<p class="text font-bold">{getTheOtherUser(members, user._id)?.username}</p>
					<p>old text</p>
				</div>
			</a>
		{/each}
	{:else}
		<p>Add some friends to chat</p>
	{/if}
</div>
