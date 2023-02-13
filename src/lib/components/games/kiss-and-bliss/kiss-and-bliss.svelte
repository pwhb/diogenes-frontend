<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { socket } from '$lib/socketio/socket';
	import { gameState } from '$lib/store/game';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	const { game, user } = $page.data;
	const isLeft = game.players[0]._id === user._id;
	console.log('log', game);
	const state = {
		topLeft: false,
		topRight: false,
		bottomLeft: false,
		bottomRight: false,
		leftKissing: false,
		rightKissing: false
	};

	const svg = {
		watching: '/games/kissnbliss/eyes.svg',
		normal: '/games/kissnbliss/normal.svg',
		kissing: '/games/kissnbliss/kiss.svg',
		smiling: '/games/kissnbliss/smile.svg',
		ready: '/games/kissnbliss/ready.svg',
		heart: '/games/kissnbliss/heart.svg'
	};

	const competitive = false;

	const startKissing = () => {
		console.log('start kissing');
		console.log({ isLeft, $gameState });
		if (isLeft) {
			gameState.update((state) => {
				return {
					...state,
					leftKissing: true
				};
			});
		} else {
			gameState.update((state) => {
				return {
					...state,
					rightKissing: true
				};
			});
		}
		socket.emit('update-game', { room: game._id, state: $gameState });
	};

	const stopKissing = () => {
		console.log('stop kissing');
		if (isLeft) {
			gameState.update((state) => {
				return {
					...state,
					leftKissing: false
				};
			});
		} else {
			gameState.update((state) => {
				return {
					...state,
					rightKissing: false
				};
			});
		}
		socket.emit('update-game', { room: game._id, state: $gameState });
	};

	onMount(() => {
		console.log('kiss');

		socket.emit('start-game', { room: game._id, state: $gameState });
	});
</script>

<div class="text-center">
	<div
		class={$gameState.rightKissing && $gameState.leftKissing
			? 'beating-heart grid grid-cols-3'
			: 'grid grid-cols-3'}
	>
		<div class="mx-auto p-2 -scale-x-100">
			<img
				src={$gameState.topLeft ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="topLeft"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2">
			<img
				src={$gameState.topRight ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="topRight"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="flex flex-row justify-center">
			<div>
				<img
					src={$gameState.leftKissing ? svg.kissing : svg.smiling}
					class={$gameState.leftKissing ? 'w-16' : 'w-16 -scale-x-100'}
					alt="topLeft"
				/>
				<p class={game.players[0]._id === user._id ? 'font-medium' : 'text-secondary'}>
					{game.players[0]._id === user._id ? 'you' : game.players[0].username}
				</p>
			</div>
			<div>
				<img
					src={$gameState.rightKissing ? svg.kissing : svg.smiling}
					class={$gameState.rightKissing ? 'w-16 -scale-x-100' : 'w-16'}
					alt="topLeft"
				/>
				<p class={game.players[1]._id === user._id ? 'font-medium' : 'text-secondary'}>
					{game.players[1]._id === user._id ? 'you' : game.players[1].username}
				</p>
			</div>
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2 -scale-x-100">
			<img
				src={$gameState.bottomLeft ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="bottomLeft"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2">
			<img
				src={$gameState.bottomRight ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="bottomLeft"
			/>
		</div>
	</div>

	<button
		class="btn btn-outline btn-warning max-w-2xl mx-auto"
		on:mousedown={startKissing}
		on:mouseup={stopKissing}
		on:touchstart={startKissing}
		on:touchend={stopKissing}
	>
		<Icon icon="fxemoji:kissmark" width={48} />
	</button>
</div>
