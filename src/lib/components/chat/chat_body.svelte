<script lang="ts">
	import { messagesStore } from '$lib/store/chat';
	import Message from './message.svelte';
</script>

<div class="overflow-x-auto scrollbar-hide grow mb-2">
	<div class="h-4/6" />
	{#each $messagesStore as message}
		<Message {message} />
	{/each}
</div>
