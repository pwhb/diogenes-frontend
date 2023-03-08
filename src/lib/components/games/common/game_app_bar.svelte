<script>
	import { page } from '$app/stores';
	import SmallAvatar from '$lib/components/common/small_avatar.svelte';
	import Icon from '@iconify/svelte';
	const { game } = $page.data;
	console.log('game', game);
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<a href={`/chat/${game.room}`}>
			<Icon icon="ic:baseline-arrow-back-ios" width="24" />
		</a>
	</div>
	<div class="navbar-center gap-5">
		<div class="flex flex-row gap-3 items-center">
			<div>
				<!-- <p class="text-xs font-medium text-center">0</p> -->
				<p class="text-xs font-medium">{game.players[0].username}</p>
			</div>
			<SmallAvatar user={game.players[0]} />
		</div>
		<div class="shadow-lg font-medium text-error">`{game.template.name}`</div>
		<div class="flex flex-row gap-3 items-center">
			<SmallAvatar user={game.players[1]} />
			<div>
				<!-- <p class="text-xs font-medium text-center">0</p> -->
				<p class="text-xs font-medium">{game.players[1].username}</p>
			</div>
		</div>
	</div>
	<div class="navbar-end">
		<!-- <button class="btn btn-ghost btn-circle">
			<div class="indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/></svg
				>
				<span class="badge badge-xs badge-primary indicator-item" />
			</div>
		</button> -->
	</div>
</div>
