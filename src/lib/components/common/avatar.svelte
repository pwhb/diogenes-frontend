<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';

	export let user: IUser = $page.data.user;
</script>

{#if user.avatar}
	<div class="avatar">
		<div class="w-16 rounded-full bg-gray-100">
			<img src={user.avatar.url} alt={user.username} />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
			<span class="text-3xl">{user.username[0]}</span>
		</div>
	</div>
{/if}
