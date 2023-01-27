<script lang="ts">
	import { page } from '$app/stores';
	import AppBar from '$lib/components/chat/app_bar.svelte';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatScreen from '$lib/components/chat/chat_body.svelte';
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messages } from '$lib/store/chat';
	import { onMount } from 'svelte';

	const { room, user } = $page.data;

	console.log('chat', { room, user });

	const onSend = () => {
		const payload = {
			sender: user._id,
			body: $chatInput,
			room: room._id
		};
		socket.emit('send-message', payload, (res: never) => {
			chatInput.set('');
			messages.update((val) => [...val, res]);
		});
		// @ts-ignore
	};

	onMount(() => {
		socket.emit('enter-room', { roomId: room._id, userId: user._id }, (res: any) => {
			console.log('enter room', res);
		});

		socket.on('receive-message', (message) => {
			console.log('receive-message', message);
			console.log('new message', message);
			// @ts-ignore
			messages.update((val) => [...val, message]);
			// Listen to the message event
			// messages = [...messages, message];
		});
	});
</script>

<div class="max-w-xl mx-auto min-h-screen bg-red-200 flex flex-col">
	<div class="">
		<AppBar />
	</div>
	<div class="grow">
		<ChatScreen />
	</div>
	<div class="">
		<BottomBar {onSend} />
	</div>
</div>
