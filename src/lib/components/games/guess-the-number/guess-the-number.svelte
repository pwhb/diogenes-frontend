<script lang="ts">
	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/common/loading_spinner.svelte';
	import { socket } from '$lib/socketio/socket';
	import { gameLoading, gameState } from '$lib/store/game';
	import Icon from '@iconify/svelte';

	const { game, user } = $page.data;
	let userGuess = '';
	let loading = false;
	// const competitive = false;

	const isLeft = game.players[0]._id === user._id;

	const guesses = [
		[12, 34],
		[34, 12]
	];

	const submitGuess = () => {
		loading = true;
		console.log($gameState, userGuess);

		gameState.update((state) => {
			const guess = state.guesses[state.guesses.length - 1];
			if (isLeft) {
				guess[0] = parseInt(userGuess);
			} else {
				guess[1] = parseInt(userGuess);
			}
			userGuess = '';
			if (guess[0] !== null && guess[1] !== null) {
				let isOver = false;
				if (state.secretNumber === guess[0]) {
					state.scores[0] += 2;
					isOver = true;
				}
				if (state.secretNumber === guess[1]) {
					state.scores[1] += 2;
					isOver = true;
				}
				if (isOver) {
					if (state.scores[0] === state.scores[1]) {
						state.winner = 'you both';
					} else {
						state.winner =
							state.scores[0] > state.scores[1]
								? game.players[0].username
								: game.players[1].username;
					}
					return state;
				}
				state.scores[
					Math.abs(state.secretNumber - guess[0]) <= Math.abs(state.secretNumber - guess[1]) ? 0 : 1
				]++;
				state.guesses.push([null, null]);
			}
			return state;
		});
		socket.emit('update-game', { room: game._id, state: $gameState });
		loading = false;
	};
</script>

{#if $gameLoading}
	<LoadingSpinner />
{:else}
	<div class="font-clock">
		<table class="table w-full text-center">
			<thead>
				<tr>
					<th>
						<p class={game.players[0]._id === user._id ? 'font-medium' : 'text-secondary'}>
							{isLeft ? 'you' : game.players[0].username} ( {$gameState.scores[0]} )
						</p></th
					>
					<th>
						<p class={game.players[1]?._id === user._id ? 'font-medium' : 'text-secondary'}>
							{isLeft ? (game.players[1] ? game.players[1].username : 'waiting ...') : 'you'}
							( {$gameState.scores[1]} )
						</p></th
					>
				</tr>
			</thead>
			<tbody>
				{#if $gameState && $gameState.guesses}
					{#each $gameState.guesses as guess}
						{#if guess[0] && guess[1]}
							<tr>
								<td
									class={Math.abs($gameState.secretNumber - guess[0]) <=
									Math.abs($gameState.secretNumber - guess[1])
										? 'text-emerald-400'
										: ''}>{guess[0]}</td
								>
								<td
									class={Math.abs($gameState.secretNumber - guess[1]) <=
									Math.abs($gameState.secretNumber - guess[0])
										? 'text-emerald-400'
										: ''}>{guess[1]}</td
								>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
		<div class="input-group mt-10 justify-center">
			{#if $gameState.winner}
				<p>{$gameState.secretNumber} is the hidden number.</p>
				<p>{$gameState.winner} won!!!</p>
			{:else if $gameState.guesses[$gameState.guesses.length - 1][isLeft ? 0 : 1] === null}
				<input
					type="number"
					min="0"
					max="100"
					placeholder="guess your number!"
					class="input input-bordered w-full max-w-xs text-center"
					bind:value={userGuess}
				/>
				<button
					disabled={loading}
					class={loading ? 'btn btn-square loading' : 'btn btn-square'}
					on:click={submitGuess}
				>
					{#if !loading}
						<Icon icon="dashicons:saved" width="24" />
					{/if}
				</button>
			{:else}
				<p>
					waiting for <span class="text-secondary inline"
						>{isLeft ? game.players[1].username : game.players[0].username}</span
					> to submit their guess...
				</p>
			{/if}
		</div>
	</div>
{/if}
