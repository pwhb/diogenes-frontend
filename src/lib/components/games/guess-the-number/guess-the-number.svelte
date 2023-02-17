<script lang="ts">
	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/common/loading_spinner.svelte';
	import { socket } from '$lib/socketio/socket';
	import { gameLoading, gameState } from '$lib/store/game';
	import { onMount } from 'svelte';
	const { game, user } = $page.data;
	const competitive = false;

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
							{isLeft ? 'you' : game.players[0].username}
						</p></th
					>
					<th>
						<p class={game.players[1]?._id === user._id ? 'font-medium' : 'text-secondary'}>
							{isLeft ? (game.players[1] ? game.players[1].username : 'waiting ...') : 'you'}
						</p></th
					>
				</tr>
			</thead>
			<tbody>
				{#if $gameState && $gameState.guesses}
				{#each $gameState.guesses as guess}
				<tr>
					<td class="text-emerald-400">{guess[0]}</td>
					<td>{guess[1]}</td>
				</tr>
			{/each}
				{/if}
				
			</tbody>
		</table>
	</div>
{/if}
