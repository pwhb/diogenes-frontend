<script lang="ts">
	import type { IMessage } from '$lib/models/message';
	import Icon from '@iconify/svelte';

	export let message: IMessage;
</script>

{#if message.type === 'text'}
	<p>{message.body}</p>
{:else if message.type === 'game'}
	<a class="text-center" href={`/games/${message.game?._id}`}>
		<Icon icon={message.game?.template.icon} class="mx-auto" />
		<p class="font-medium">{message.game?.template.name}</p>
		<p>players: {message.game?.players.length}/{message.game?.playerCount}</p>

		<!-- <Icon  /> -->
	</a>
{/if}
