<script lang="ts">
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';
	import Avatar from '../common/avatar.svelte';

	export let user: IUser;
	export let followings = $page.data.followings;
	export let followers = $page.data.followers;
	const { avatars } = $page.data;
	console.log('avatars', avatars);
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
				<!-- The button to open modal -->
				<label for="my-modal-3" class="btn">open modal</label>

				<!-- Put this part before </body> tag -->
				<input type="checkbox" id="my-modal-3" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box relative">
						<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
						<h3 class="text-lg font-bold">Choose your avatar</h3>
						<div class="grid grid-cols-4 gap-4">
							{#each avatars as { name, path }}
								<div class="avatar">
									<div class="w-18 rounded-full object-cover">
										<img class="" src={`/avatars/${path}`} alt={name} />
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="mt-24">
					<form action="/logout" method="post">
						<button class="btn btn-error btn-xs" type="submit">Log out</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
