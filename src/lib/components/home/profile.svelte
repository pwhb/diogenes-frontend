<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { IUser } from '$lib/models/user';
	import Icon from '@iconify/svelte';
	import Avatar from '../common/avatar.svelte';
	import AvatarModal from '../modal/avatar_modal.svelte';
	import UserInfoModal from '../modal/userInfo_modal.svelte';
	import Bio from './bio.svelte';

	export let user: IUser = $page.data.user;
	export let followings = $page.data.followings;
	export let followers = $page.data.followers;
	const isOwnPage = $page.data.user.username === user.username;
	let userKey = {};
	const reloadUser = () => {
		userKey = {};
	};

	console.log('user', user);
</script>

<div class="card w-full shadow-xl">
	<img class="object-fill h-48 -mb-16" src="/undraw_stars.svg" alt="Shoes" />
	<div class="card-body">
		<div class="text-center flex flex-col items-center">
			{#if isOwnPage}
				<div class="-mb-2">
					{#key userKey}
						<Avatar />
					{/key}
					<label for="avatar-modal" class="relative bottom-5 left-12">
						<Icon icon="material-symbols:add-circle" width="18" />
					</label>
					<input type="checkbox" id="avatar-modal" class="modal-toggle" />
					<AvatarModal {reloadUser} />
				</div>
			{:else}
				<div class="mb-3">
					<Avatar {user} />
				</div>
			{/if}

			<p class="text font-bold">
				{isOwnPage ? $page.data.user.username : user.username}

				{#if isOwnPage}
					<label for="userInfo-modal">
						<Icon class="inline" icon="material-symbols:edit" width="16" />
					</label>
					<input type="checkbox" id="userInfo-modal" class="modal-toggle" />
					<UserInfoModal {reloadUser} />
				{/if}
			</p>
			<div class="card">follower: {followers.length} | following: {followings.length}</div>

			{#if isOwnPage}
				{#key userKey}
					<Bio />
				{/key}
			{:else}
				<Bio {user} />
			{/if}

			{#if isOwnPage}
				<!-- The button to open modal -->

				<div class="mt-24">
					<form action="/logout" method="post">
						<button class="btn btn-error btn-xs" type="submit">Log out</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
