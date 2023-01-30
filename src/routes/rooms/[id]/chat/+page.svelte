<script lang="ts">
	import { page } from '$app/stores';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatBody from '$lib/components/chat/chat_body.svelte';
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messagesStore } from '$lib/store/chat';

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
			// @ts-ignore
			res.new = true;
			messagesStore.update((val) => [...val, res]);
		});
	};
</script>

<ChatBody />

<BottomBar {onSend} />
