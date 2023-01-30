<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';
	import Avatar from '../common/avatar.svelte';

	export let user: IUser;
	export let followings = $page.data.followings;
	export let followers = $page.data.followers;
	const isOwnPage = $page.data.user.username === user.username;
</script>

<div class="card w-full shadow-xl">
	<img class="object-fill h-48 -mb-16" src="/undraw_stars.svg" alt="Shoes" />
	<div class="card-body">
		<div class="text-center flex flex-col items-center">
			<Avatar {user} />

			<p class="text font-bold">{user.username}</p>
			<div class="card">follower: {followers.length} | following: {followings.length}</div>
			{#if isOwnPage}
				<div class="mt-24">
					<form action="/logout" method="post">
						<button class="btn btn-error btn-xs" type="submit">Log out</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
