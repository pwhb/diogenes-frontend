<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';

	export let user: IUser;
	export let followings = $page.data.followings;
	export let followers = $page.data.followers;
	const isOwnPage = $page.data.user.username === user.username;
</script>

<div class="card w-full shadow-xl">
	<img class="object-fill h-48 -mb-16" src="https://placeimg.com/400/225/arch" alt="Shoes" />
	<div class="card-body">
		<div class="text-center flex flex-col items-center">
			<div class="avatar">
				{#if user.avatar}
					<div class="avatar">
						<div class="w-16 rounded-full">
							<img src={user.avatar} alt={user.username} />
						</div>
					</div>
				{:else}
					<div class="avatar placeholder">
						<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
							<span class="text-3xl">{user.username[0]}</span>
						</div>
					</div>
				{/if}
			</div>

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
