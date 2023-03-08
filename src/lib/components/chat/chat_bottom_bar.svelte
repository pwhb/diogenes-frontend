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
	const timeoutms = 2000
	let timeout: any;
	let typing = false;
	const timeoutFunction = () => {
		console.log('stop', user);
		typing = false;
		socket.emit('stop-typing', { roomId: room._id, username: user.username });
	};

	const onKeyDownNotEnter = () => {
		if (typing) {
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, timeoutms);
		} else {
			typing = true;
			console.log('start', user);
			socket.emit('start-typing', { roomId: room._id, username: user.username });
			timeout = setTimeout(timeoutFunction, timeoutms);
		}
	};
</script>

<div class="max-w-xl w-full bg-base-100 mx-auto">
	{#if $typingUser && $typingUser !== user.username}
		<p class="mx-4 h-10">
			<Icon class="inline-block" icon="material-symbols:keyboard" />
			<span class="font-medium text-success"
				>{$typingUser}</span
			> is typing <span class="typing-dots">...</span>
		</p>
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
