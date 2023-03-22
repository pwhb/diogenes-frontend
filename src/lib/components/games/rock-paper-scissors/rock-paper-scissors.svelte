<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import LoadingSpinner from '$lib/components/common/loading_spinner.svelte';
	import { socket } from '$lib/socketio/socket';
	import { gameLoading, gameState } from '$lib/store/game';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	console.log('gameState', $gameState);
	let loading = false;
	const { game, user } = $page.data;
	const availableChoices = {
		rock: 'rock',
		paper: 'paper',
		scissors: 'scissors'
	};

	const icons = {
		rock: 'noto:raised-fist-medium-light-skin-tone',
		paper: 'noto:hand-with-fingers-splayed-medium-light-skin-tone',
		scissors: 'noto:victory-hand-medium-light-skin-tone'
	};

	const isLeft = game.players[0]._id === user._id;
	// @ts-ignore
	const onTap = (choice) => {
		loading = true;
		gameState.update((state) => {
			if (!state.choices[isLeft ? 0 : 1]) {
				state.choices[isLeft ? 0 : 1] = choice;

				if (state.choices[0] && state.choices[1]) {
					console.log('finished');
					if (state.choices[0] === state.choices[1]) {
						state.scores[0]++;
						state.scores[1]++;
						state.winner = [true, true];
					} else if (
						(state.choices[0] === availableChoices.rock &&
							state.choices[1] === availableChoices.scissors) ||
						(state.choices[0] === availableChoices.paper &&
							state.choices[1] === availableChoices.rock) ||
						(state.choices[0] === availableChoices.scissors &&
							state.choices[1] === availableChoices.paper)
					) {
						state.scores[0]++;
						state.winner = [true, false];
					} else {
						state.scores[1]++;
						state.winner = [false, true];
					}
					state.prevChoices = state.choices;
					state.choices = [];
				}
			}
			return state;
		});
		socket.emit('update-game', { room: game._id, state: $gameState });
		loading = false;
	};

	onMount(() => {
		console.log('rps');
	});
</script>

{#if $gameLoading}
	<LoadingSpinner />
{:else}
	<div class="flex flex-col flex-grow">
		<div class="flex flex-col flex-grow justify-between items-center my-20">
			<div class="flex flex-row gap-5 items-start">
				{#if $gameState.prevChoices[isLeft ? 1 : 0]}
					<div
						class={$gameState.winner[isLeft ? 1 : 0]
							? 'bg-green-500 rotate-180 rounded-full p-1 shadow-lg'
							: 'bg-red-500 rotate-180 rounded-full p-1 shadow-lg'}
					>
						<Icon width={'32'} icon={icons[$gameState.prevChoices[isLeft ? 1 : 0]]} />
					</div>
				{/if}
				{#if $gameState.choices[isLeft ? 1 : 0]}
					<!-- <div class="rotate-180">
						<Icon width={'80'} icon={icons[$gameState.choices[isLeft ? 1 : 0]]} />
					</div> -->
					<div class="rotate-180">
						<Icon width={'80'} icon="noto:waving-hand-medium-light-skin-tone" />
					</div>
				{:else}
					<div class="rotate-180">
						<Icon
							width={'80'}
							class="size-changing"
							icon="noto:waving-hand-medium-light-skin-tone"
						/>
					</div>
				{/if}
				<div
					class={$gameState.winner[isLeft ? 1 : 0]
						? 'bg-green-500 text-white rounded-md p-1 shadow-lg'
						: 'bg-red-500 text-white rounded-md p-1 shadow-lg'}
				>
					{$gameState.scores[isLeft ? 1 : 0]}
				</div>
			</div>

			<Icon width={'24'} icon="noto-v1:vs-button" />
			<div class="flex flex-row gap-5 items-end">
				<div
					class={$gameState.winner[isLeft ? 0 : 1]
						? 'bg-green-500 text-white rounded-md p-1 shadow-lg'
						: 'bg-red-500 text-white rounded-md p-1 shadow-lg'}
				>
					{$gameState.scores[isLeft ? 0 : 1]}
				</div>
				{#if $gameState.choices[isLeft ? 0 : 1]}
					<div>
						<Icon width={'80'} icon={icons[$gameState.choices[isLeft ? 0 : 1]]} />
					</div>
					<!-- {:else if $gameState.prevChoices[isLeft ? 0 : 1]}
				<div>
					<Icon width={'80'} icon={icons[$gameState.prevChoices[isLeft ? 0 : 1]]} />
				</div> -->
				{:else}
					<div>
						<Icon
							width={'80'}
							class="size-changing"
							icon="noto:waving-hand-medium-light-skin-tone"
						/>
					</div>
				{/if}
				{#if $gameState.prevChoices[isLeft ? 0 : 1]}
					<div
						class={$gameState.winner[isLeft ? 0 : 1]
							? 'bg-green-500 rounded-full p-1 shadow-lg'
							: 'bg-red-500 rounded-full p-1 shadow-lg'}
					>
						<Icon width={'32'} icon={icons[$gameState.prevChoices[isLeft ? 0 : 1]]} />
					</div>
				{/if}
			</div>
		</div>

		<div class="flex flex-row gap-10 items-center justify-center mb-20">
			<button class="hover:scale-125 -rotate-12" on:click={() => onTap(availableChoices.rock)}>
				<Icon width={'54'} id="rock" icon="noto:raised-fist-medium-light-skin-tone" />
			</button>
			<button class="hover:scale-125" on:click={() => onTap(availableChoices.paper)}>
				<Icon width={'54'} icon="noto:hand-with-fingers-splayed-medium-light-skin-tone" />
			</button>
			<button class="hover:scale-125 rotate-12" on:click={() => onTap(availableChoices.scissors)}>
				<Icon width={'54'} icon="noto:victory-hand-medium-light-skin-tone" />
			</button>
		</div>
	</div>
{/if}
