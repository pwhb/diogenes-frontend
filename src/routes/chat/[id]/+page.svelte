<script lang="ts">
	import { page } from '$app/stores';

	import ChatAppBar from '$lib/components/chat/chat_app_bar.svelte';
	import ChatBody from '$lib/components/chat/chat_body.svelte';
	import ChatBottomBar from '$lib/components/chat/chat_bottom_bar.svelte';
	import SocketEvents from '$lib/consts/SocketEvents';
	import { socket } from '$lib/socketio/socket';
	import { messagesStore } from '$lib/store/chat';
	import { onMount } from 'svelte';

	const { room, user, messages } = $page.data;

	onMount(() => {
		if (messages[0]) {
			messages[messages.length - 1].new = true;
		}

		messagesStore.set(messages);

		// console.log(messages);
		// const lastMessage = messages[messages.length - 1] as IMessage;
		// 	if (lastMessage) {
		// 		console.log('lastMessage', lastMessage);
		// 		const id = lastMessage._id.toString();
		// 		scrollIntoView(id);
		// 	}
		socket.emit(SocketEvents.EnterRoom, { roomId: room._id, userId: user._id }, (res: any) => {});
	});
</script>

<div class="max-w-xl mx-auto h-screen flex flex-col">
	<ChatAppBar />

	<ChatBody />

	<ChatBottomBar />
</div>
