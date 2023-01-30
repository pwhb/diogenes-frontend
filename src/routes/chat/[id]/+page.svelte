<script lang="ts">
	import { page } from '$app/stores';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatAppBar from '$lib/components/chat/chat_app_bar.svelte';
	import ChatBody from '$lib/components/chat/chat_body.svelte';
	import type { IMessage } from '$lib/models/message';
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messagesStore } from '$lib/store/chat';
	import { scrollIntoView } from '$lib/utils/scroll';
	import { onMount } from 'svelte';

	const { room, user, messages } = $page.data;

	console.log('chat', { room, user });

	const onSend = () => {
		const payload = {
			sender: user._id,
			body: $chatInput,
			room: room._id
		};
		socket.emit('send-message', payload, (res: never) => {
			chatInput.set('');
			// @ts-ignore
			res.new = true;
			messagesStore.update((val) => [...val, res]);
		});
	};

	onMount(() => {
		messagesStore.set(messages);

		socket.emit('enter-room', { roomId: room._id, userId: user._id }, (res: any) => {
			const lastMessage = $messagesStore[$messagesStore.length - 1] as IMessage;
			const id = lastMessage._id.toString();
			scrollIntoView(id);
		});

		socket.on('receive-message', (message) => {
			message.new = true;
			// @ts-ignore
			messagesStore.update((val) => [...val, message]);
		});
	});
</script>

<div class="max-w-xl mx-auto h-screen flex flex-col">
	<ChatAppBar />

	<ChatBody />

	<BottomBar {onSend} />
</div>
