<script>
	import { page } from '$app/stores';
	import { messagesStore } from '$lib/store/chat';
	import { getUser } from '$lib/utils/get';
	import Message from './message.svelte';
	const { room } = $page.data;
</script>

<div class="overflow-x-auto">
	{#each $messagesStore as message}
		<Message {message} />
		<!-- <div>{getUser(room.members, message.sender).username} : {message.body}</div>
			<div>{message.createdAt}</div> -->
	{/each}
</div>
