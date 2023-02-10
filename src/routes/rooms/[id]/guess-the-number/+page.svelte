<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/games/guess-the-number/main.svelte';

	import { socket } from '$lib/socketio/socket';
	import { messagesStore } from '$lib/store/chat';
	const { user, room } = $page.data;
</script>

<Main />
<!-- <ChatBody />

<BottomBar {onSend} /> -->
