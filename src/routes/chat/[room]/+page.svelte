<script>
	import { page } from '$app/stores';
	import AppBar from '$lib/components/chat/app_bar.svelte';
	import BottomBar from '$lib/components/chat/bottom_bar.svelte';
	import ChatScreen from '$lib/components/chat/chat_screen.svelte';

	const { room, user } = $page.data;

	console.log('chat', { room, user });
</script>

<div class="max-w-xl mx-auto min-h-screen bg-red-200 flex flex-col">
	<div class="">
		<AppBar />
	</div>
	<div class="grow">
		<ChatScreen />
	</div>
	<div class="">
		<BottomBar />
	</div>
</div>
