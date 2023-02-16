<script lang="ts">
	import Icon from '@iconify/svelte';
	import Drawer from './drawer.svelte';
	// import { socket } from '$lib/socketio/socket';
	// import { messagesStore } from '$lib/store/chat';
	import { page } from '$app/stores';
	import { sendMessage } from '$lib/utils/socket';
	import { messagesStore, typingUser } from '$lib/store/chat';
	import { socket } from '$lib/socketio/socket';

	let drawerOpen = false;
	const { room, user } = $page.data;
	let chatInput = '';

	const onOpenDrawer = () => {
		drawerOpen = !drawerOpen;
	};

	const onSend = () => {
		if (chatInput) {
			sendMessage(
				{
					sender: user._id,
					body: chatInput,
					room: room._id
				},
				messagesStore
			);
			chatInput = '';
		}
	};

	let timeout: any;
	let typing = false;
	const timeoutFunction = () => {
		typing = false;
		socket.emit('stop-typing', { roomId: room._id, username: user.username });
	};

	const onKeyDownNotEnter = () => {
		if (typing === false) {
			typing = true;
			console.log(user);
			socket.emit('start-typing', { roomId: room._id, username: user.username });
			timeout = setTimeout(timeoutFunction, 1000);
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, 1000);
		}
	};
</script>

<div class="max-w-xl w-full bg-base-100 mx-auto">
	{#if $typingUser}
		<p>{$typingUser} is typing ...</p>
	{/if}
	<form on:submit|preventDefault={onSend}>
		<div class="form-control w-full">
			<div class="input-group">
				<button class="btn btn-square" on:click={onOpenDrawer} type="button">
					<Icon icon="noto:video-game" width="24" />
				</button>
				<input
					type="text"
					placeholder="Say Hi ..."
					class="input input-bordered w-full"
					on:input={onKeyDownNotEnter}
					bind:value={chatInput}
				/>

				<button class="btn btn-square" type="submit">
					<Icon icon="mdi:send" width="24" />
				</button>
			</div>
		</div>
	</form>
	{#if drawerOpen}
		<div>
			<Drawer />
		</div>
	{/if}
</div>
