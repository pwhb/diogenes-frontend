<script lang="ts">
	import type { IMessage } from '$lib/models/message';
	import { gameMessagesStore, unreadCount } from '$lib/store/game';

	import { scrollIntoView } from '$lib/utils/scroll';
	import { onMount } from 'svelte';

	import Message from '../../chat/message.svelte';
	onMount(() => {
		unreadCount.set(0)
		const lastMessage = $gameMessagesStore[$gameMessagesStore.length - 1] as IMessage;
		if (lastMessage) {
			console.log('lastMessage', lastMessage);
			const id = lastMessage._id.toString();
			scrollIntoView(id);
		}
	});
</script>

<div class="overflow-x-auto scrollbar-hide grow mb-2 game-chat">
	<div class="h-4/6" />
	{#each $gameMessagesStore as message}
		<Message {message} />
	{/each}
</div>
