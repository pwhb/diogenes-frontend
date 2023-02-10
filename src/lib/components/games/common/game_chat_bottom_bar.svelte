<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { sendMessage } from '$lib/utils/socket';
	import GameChatBody from './game_chat_body.svelte';
	import { gameMessagesStore } from '$lib/store/game';

	let chatOpen = false;
	const { room, user, game } = $page.data;
	let chatInput = '';

	const onChatOpen = () => {
		chatOpen = !chatOpen;
		if (chatOpen) {
		}
	};

	const onSend = () => {
		console.log(game);
		if (chatInput) {
			sendMessage(
				{
					sender: user._id,
					body: chatInput,
					room: game._id,
					type: 'text',
					inGame: true
				},
				gameMessagesStore
			);
			chatInput = '';
		}
	};
</script>

{#if chatOpen}
	<GameChatBody />

	<div class="max-w-xl w-full bg-base-100 mx-auto">
		<form on:submit|preventDefault={onSend}>
			<div class="form-control w-full">
				<div class="input-group">
					<button class="btn btn-square" on:click={onChatOpen} type="button">
						<Icon icon="mingcute:close-circle-line" width="24" />
					</button>
					<input
						type="text"
						placeholder="Say Hi ..."
						class="input input-bordered w-full"
						bind:value={chatInput}
					/>

					<button class="btn btn-square" type="submit">
						<Icon icon="mdi:send" width="24" />
					</button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<div class="fixed bottom-3 right-0 left-0 text-center">
		<button class="btn btn-outline" on:click={onChatOpen}>
			<Icon icon="fa6-solid:comment" />
		</button>
	</div>
{/if}
