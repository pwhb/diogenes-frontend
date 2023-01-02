<script>
	import { socket } from '$lib/socketio/socket';
	import { messages, roomName, username } from '$lib/store/chat';
	import { onMount } from 'svelte';

	let roomNameChoosen = false;

	const submitRoomName = () => {
		socket.emit('set-room', $roomName);
		roomNameChoosen = true;
	};

	onMount(() => {
		socket.on('receive-message', (message) => {
			console.log(message);
			// @ts-ignore
			messages.update((val) => [...val, message]);
			// Listen to the message event
			// messages = [...messages, message];
		});
		socket.on('name', (name) => {
			// Another listener for the name:
			// username = name; // Update the name so it can be displayed
			username.set(name);
		});
	});
</script>

<div class="">
	<div class="text-center text-black bg-gray-300">
		{#if roomNameChoosen}
			<h2>{$roomName}</h2>
		{:else}
			<input
				type="text"
				placeholder="room"
				class="input w-full bg-white max-w-xs"
				bind:value={$roomName}
			/>
			<button on:click={submitRoomName}>Submit</button>
		{/if}
		<h1>{$username}</h1>
		{#each $messages as message}
			<div>{message.username} : {message.body}</div>
			<div>{message.time}</div>
		{/each}
	</div>
</div>
