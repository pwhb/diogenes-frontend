<script lang="ts">
	import { page } from '$app/stores';
	import { messagesStore } from '$lib/store/chat';
	import { sendMessage } from '$lib/utils/socket';
	import Icon from '@iconify/svelte';
	import type { ObjectId } from 'mongoose';

	const { room, templates, user } = $page.data;

	const createGame = async (payload: {
		template: any;
		mode: any;
		playerCount: any;
		room: ObjectId;
	}) => {
		const url = '/api/games';
		const options = {
			method: 'POST',
			body: JSON.stringify(payload)
		};

		const res = await fetch(url, options);
		const data = await res.json();

		console.log('created game', data.game);

		sendMessage(
			{
				sender: user._id,
				game: data.game._id,
				body: `${user.username} created the game`,
				room: room._id,
				type: 'game'
			},
			messagesStore
		);
	};
</script>

<div class="grid grid-cols-2 gap-1 m-2 text-center">
	{#each templates as { _id, name, icon, slug, modes, playerCounts }}
		<button
			class="border h-30 border-dashed py-2 rounded-md hover:opacity-75"
			on:click={() =>
				createGame({
					template: _id,
					mode: modes[0],
					playerCount: playerCounts[0],
					room: room._id
				})}
		>
			<Icon {icon} width="64" class="mx-auto" />
			<p>{name}</p>
		</button>
	{/each}
</div>
