<script lang="ts">
	import { page } from '$app/stores';
	import GameAppBar from '$lib/components/games/common/game_app_bar.svelte';

	import GameChatBottomBar from '$lib/components/games/common/game_chat_bottom_bar.svelte';
	import KissAndBliss from '$lib/components/games/kiss-and-bliss/kiss-and-bliss.svelte';

	import RockPaperScissors from '$lib/components/games/rock-paper-scissors/rock-paper-scissors.svelte';

	import { socket } from '$lib/socketio/socket';

	import { gameMessagesStore } from '$lib/store/game';

	import { onDestroy, onMount } from 'svelte';

	const { game, user, messages } = $page.data;

	onMount(() => {
		gameMessagesStore.set(messages);

		socket.emit('enter-room', { roomId: game._id, userId: user._id }, (res: any) => {
			console.log(res);
		});
	});

	onDestroy(() => {
		socket.emit('leave-room', { roomId: game._id, userId: user._id }, (res: any) => {
			// console.log('leave-room', res);
		});
	});
</script>

<div class="max-w-xl mx-auto h-screen flex flex-col">
	<GameAppBar />
	<!-- <p>game {game.template.name}</p> -->
	{#if game.template.name === "kiss and bliss"}
		<KissAndBliss/>
		{:else if game.template.name === "rock paper scissors"}
		<RockPaperScissors/>
	{/if}
	<GameChatBottomBar />
</div>
