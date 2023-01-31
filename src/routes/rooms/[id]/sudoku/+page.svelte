<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/games/sudoku/main.svelte';

	import { socket } from '$lib/socketio/socket';
	import { chatInput, messagesStore } from '$lib/store/chat';
	const { user, room } = $page.data;

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

<Main />
