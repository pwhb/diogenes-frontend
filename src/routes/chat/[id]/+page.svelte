<script lang="ts">
	import { page } from '$app/stores';
	import AppBar from '$lib/components/chat/app_bar.svelte';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatAppBar from '$lib/components/chat/chat_app_bar.svelte';
	import ChatScreen from '$lib/components/chat/chat_body.svelte';
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

	onMount(() => {
		messagesStore.set(messages);
		socket.emit('enter-room', { roomId: room._id, userId: user._id }, (res: any) => {
			console.log('enter room', res);
		});

		socket.on('receive-message', (message) => {
			console.log('receive-message', message);
			console.log('new message', message);
			// @ts-ignore
			messagesStore.update((val) => [...val, message]);
			// Listen to the message event
			// messagesStore = [...messagesStore, message];
		});
	});
</script>

<div class="max-w-xl mx-auto max-h-screen flex flex-col">
	<ChatAppBar />

	<ChatScreen />

	<BottomBar {onSend} />
</div>
