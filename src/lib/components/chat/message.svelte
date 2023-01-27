<script lang="ts">
	import { page } from '$app/stores';
	import type { IMessage } from '$lib/models/message';

	import { getSince, getUser } from '$lib/utils/get';

	export let message: IMessage;
	const id = message._id.toString();
	const { room, user } = $page.data;
	const sender = getUser(room.members, message.sender);
	const createdAt = getSince(message.createdAt);

	console.log(`${message._id} created`);
</script>

{#if sender._id === user._id}
	<div class="chat chat-end" {id}>
		<div class="chat-header">
			{sender.username}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-accent">{message.body}</div>
		<p>{message._id}</p>
	</div>
{:else}
	<div class="chat chat-start" {id}>
		<div class="chat-header">
			{sender.username}
			<time class="text-xs opacity-50">{createdAt}</time>
		</div>
		<div class="chat-bubble chat-bubble-secondary">{message.body}</div>
	</div>
{/if}
