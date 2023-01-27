<script lang="ts">
	import { page } from '$app/stores';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatAppBar from '$lib/components/chat/chat_app_bar.svelte';
	import ChatScreen from '$lib/components/chat/chat_body.svelte';
	import type { IMessage } from '$lib/models/message';
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messagesStore } from '$lib/store/chat';
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
			messagesStore.update((val) => [...val, res]);
			console.log('send-message', $messagesStore);
		});
		// @ts-ignore
	};

	function scrollIntoView(id: string) {
		const el = document.getElementById(id);
		console.log('scrollIntoView', { el, id });
		if (!el) return;
		el.scrollIntoView({
			behavior: 'auto'
		});
	}

	onMount(() => {
		messagesStore.set(messages);

		socket.emit('enter-room', { roomId: room._id, userId: user._id }, (res: any) => {
			console.log('enter room', res);
			const lastMessage = $messagesStore[$messagesStore.length - 1] as IMessage;
			const id = lastMessage._id.toString();
			scrollIntoView(id);
		});

		socket.on('receive-message', (message) => {
			console.log('receive-message', message);
			// @ts-ignore
			messagesStore.update((val) => [...val, message]);
			console.log('receive-message', $messagesStore);
			const id = message._id.toString();
			scrollIntoView(id);
			// Listen to the message event
			// messagesStore = [...messagesStore, message];
		});
	});
</script>

<div class="max-w-xl mx-auto h-screen bg-pink-300 flex flex-col">
	<ChatAppBar />

	<ChatScreen />

	<BottomBar {onSend} />
</div>
