<script>
	import { socket } from '$lib/socketio/socket';
	import { chatInput, messages, roomName, username } from '$lib/store/chat';

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
</script>

<div class="form-control">
	<div class="input-group">
		<input
			type="text"
			placeholder="Say Hi ..."
			class="input input-bordered w-full"
			bind:value={$chatInput}
		/>
		<button class="btn btn-square" on:click={onSend}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
	</div>
</div>
