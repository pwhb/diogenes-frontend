<script lang="ts">
	import { page } from '$app/stores';
	import BottomBar from '$lib/components/chat/chat_bottom_bar.svelte';
	import ChatBody from '$lib/components/chat/chat_body.svelte';
	import Main from '$lib/components/games/kiss-and-bliss/main.svelte';
	import { socket } from '$lib/socketio/socket';
	import { messagesStore } from '$lib/store/chat';
	const { user, room } = $page.data;
</script>

<Main />
<!-- <ChatBody />

<BottomBar {onSend} /> -->
