<script lang="ts">
	import { page } from '$app/stores';

	import ChatAppBar from '$lib/components/chat/chat_app_bar.svelte';
	import ChatBody from '$lib/components/chat/chat_body.svelte';
	import ChatBottomBar from '$lib/components/chat/chat_bottom_bar.svelte';
	import type { IMessage } from '$lib/models/message';
	import { socket } from '$lib/socketio/socket';
	import { messagesStore } from '$lib/store/chat';
	import { scrollIntoView } from '$lib/utils/scroll';
	import { onMount } from 'svelte';

	const { room, user, messages } = $page.data;

	onMount(() => {
		messagesStore.set(messages);

		console.log(messages);

		socket.emit('enter-room', { roomId: room._id, userId: user._id }, (res: any) => {
			const lastMessage = $messagesStore[$messagesStore.length - 1] as IMessage;
			if (lastMessage) {
				console.log('lastMessage', lastMessage);
				const id = lastMessage._id.toString();
				scrollIntoView(id);
			}
		});
	});
</script>

<div class="max-w-xl mx-auto h-screen flex flex-col">
	<ChatAppBar />

	<ChatBody />

	<ChatBottomBar />
</div>
