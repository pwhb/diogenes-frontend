<script>
	import { messages } from '$lib/store/chat';
</script>

<div class="">
	<div class="text-center text-black bg-gray-300">
		{#each $messages as message}
			<div>{message.username} : {message.body}</div>
			<div>{message.time}</div>
		{/each}
	</div>
</div>
