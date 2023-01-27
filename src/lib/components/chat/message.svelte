<script lang="ts">
	import { page } from '$app/stores';
	import type { IMessage } from '$lib/models/message';

	import { getSince, getUser } from '$lib/utils/get';

	export let message: IMessage;

	const { room, user } = $page.data;
	const sender = getUser(room.members, message.sender);
	const createdAt = getSince(message.createdAt);
</script>

{#if sender._id === user._id}
	<div class="chat chat-end">
		<div class="chat-header">
			{sender.username}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-accent">{message.body}</div>
	</div>
{:else}
	<div class="chat chat-start">
		<div class="chat-header">
			{sender.username}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-secondary">{message.body}</div>
	</div>
{/if}
