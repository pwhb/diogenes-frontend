<script>
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messages, roomName, username } from '$lib/store/chat';
	import Icon from '@iconify/svelte';
	let drawerOpen = false;
	const onSend = () => {
		const newMessage = {
			username: $username,
			body: $chatInput,
			time: new Date(),
			room: $roomName
		};
		socket.emit('send-message', newMessage);
		// @ts-ignore
		messages.update((val) => [...val, newMessage]);
		chatInput.set('');
	};
	const onOpenDrawer = () => {
		drawerOpen = !drawerOpen;
	};
</script>

<div class="bg-black">
	<div class="form-control">
		<div class="input-group">
			<button class="btn btn-square" on:click={onOpenDrawer}>
				<Icon icon="noto:video-game" width="24" />
			</button>
			<input
				type="text"
				placeholder="Say Hi ..."
				class="input input-bordered w-full"
				bind:value={$chatInput}
			/>
			<button class="btn btn-square" on:click={onSend}>
				<Icon icon="mdi:send" width="24" />
			</button>
		</div>
	</div>
	{#if drawerOpen}
		<div>
			<p>drawer</p>
		</div>
	{/if}
</div>
