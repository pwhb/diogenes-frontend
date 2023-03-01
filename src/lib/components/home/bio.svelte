<script>
	import { page } from '$app/stores';

	export let user = $page.data.user;
</script>

<div class="card w-64 my-2 bg-slate-600 shadow-xl">
	<div class="card-body font-medium">
		{#if user.bio}
			<p>{user.bio}</p>
		{:else}
			<p class="opacity-70">Hi I'm {user.username} ...</p>
		{/if}
	</div>
</div>
