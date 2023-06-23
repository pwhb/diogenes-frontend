<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { IMessage } from '$lib/models/message';
	import { messagesStore } from '$lib/store/chat';
	import { sendMessage } from '$lib/utils/socket';
	import Icon from '@iconify/svelte';

	export let message: IMessage;

	const { user, room } = $page.data;
	// href={`/games/${message.game?._id}`}

	const onJoin = async () => {
		console.log('onJoin', message);
		const url = `/api/v0/games/${message.game?._id}`;
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		const { success, updated, game } = data;
		if (updated) {
			sendMessage(
				{
					sender: user._id,
					game: game,
					body: `${user.username} joined the game`,
					room: room._id,
					type: 'game'
				},
				messagesStore
			);
		}

		goto(`/games/${game._id}`);
	};
</script>

{#if message.type === 'text'}
	<p>{message.body}</p>
{:else if message.type === 'game'}
	<button class="opacity-75 hover:opacity-100" on:click={onJoin}>
		<Icon icon={message.game?.template.icon} width={48} class="mx-auto" />
		<p class="font-semibold text-lg">{message.game?.template.name}</p>
		<table class="table table-compact">
			<tr>
				<td>mode</td>
				<td>
					{message.game?.mode}
				</td>
			</tr>
			<tr>
				<td>players </td>
				<td>
					{message.game?.players.length}/{message.game?.playerCount}
				</td>
			</tr>
			<tr>
				<td>status </td>
				<td>
					{message.game?.status}
				</td>
			</tr>
		</table>
		<p class="text-sm font-light">{message.body}</p>
		<!-- <Icon  /> -->
	</button>
{/if}
