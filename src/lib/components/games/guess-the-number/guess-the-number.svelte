<script lang="ts">
	import { page } from '$app/stores';
	import { socket } from '$lib/socketio/socket';
	import { gameState } from '$lib/store/game';
	import { onMount } from 'svelte';
	const { game, user } = $page.data;
	const competitive = false;

	const trueAnswer = 43;

	let loading = true;
	const isLeft = game.players[0]._id === user._id;

	const guesses = [
		[12, 34],
		[34, 12]
	];

	const state = {
		guesses: [
			[12, 34],
			[34, 12]
		]
	};

	const submitGuess = () => {
		socket.emit('');
	};
	onMount(() => {
		gameState.set(state);
		console.log('kiss');
		socket.emit('start-game', { room: game._id, state: $gameState });
		loading = false;
	});
</script>

<div class="font-clock">
	<table class="table w-full text-center">
		<thead>
			<tr>
				<th>user1</th>
				<th>user2</th>
			</tr>
		</thead>
		<tbody>
			{#each guesses as guess}
				<tr>
					<td class="text-emerald-400">{guess[0]}</td>
					<td>{guess[1]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
