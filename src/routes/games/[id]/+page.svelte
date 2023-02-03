<script lang="ts">
	import { page } from '$app/stores';
	import GameAppBar from '$lib/components/games/common/game_app_bar.svelte';

	import GameChatBottomBar from '$lib/components/games/common/game_chat_bottom_bar.svelte';
	import type { IMessage } from '$lib/models/message';
	import { socket } from '$lib/socketio/socket';
	import { messagesStore } from '$lib/store/chat';
	import { scrollIntoView } from '$lib/utils/scroll';
	import { onDestroy, onMount } from 'svelte';

	const { game, user, messages } = $page.data;

	onMount(() => {
		messagesStore.set(messages);

		socket.emit('enter-room', { roomId: game._id, userId: user._id }, (res: any) => {
			console.log('enter game', res);
			console.log('enter', socket);
		});
		// console.log('game page', game, messages);

		socket.on('receive-message', (message) => {
			console.log(socket);

			message.new = true;
			// @ts-ignore
			messagesStore.update((val) => {
				console.log('update update update update update', {
					prev: val,
					next: [...val, message]
				});
				return [...val, message];
			});
			// console.log('receive after', message, $messagesStore);
		});
	});

	onDestroy(() => {
		socket.emit('leave-room', { roomId: game._id, userId: user._id }, (res: any) => {
			console.log('leave-room', res);
		});
	});
</script>

<div class="max-w-xl mx-auto h-screen flex flex-col">
	<GameAppBar />
	<p>game {game.template}</p>

	<GameChatBottomBar />
</div>
