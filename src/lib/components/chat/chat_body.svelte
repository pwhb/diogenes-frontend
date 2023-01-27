<script>
	import { messagesStore } from '$lib/store/chat';
	import Message from './message.svelte';
</script>

<div class="overflow-x-auto">
	{#each $messagesStore as message}
		<Message {message} />
	{/each}
</div>
