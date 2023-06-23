<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	export let reloadUser: () => void;

	const { user } = $page.data;
	let username = user.username;
	let bio = user.bio;

	let submitLoading = false;
	const formError = { username: '' };

	const onSubmitUserInfo = async () => {
		formError.username = '';
		submitLoading = true;
		const url = '/api/v0/users';
		const payload = {
			username,
			bio
		};
		const options = {
			method: 'PATCH',
			body: JSON.stringify(payload)
		};
		const res = await fetch(url, options);
		const data = await res.json();
		const { success, error } = data;
		console.log(data);

		submitLoading = false;
		if (success) {
			await invalidateAll();

			reloadUser();
			// @ts-ignore
			document.getElementById('userInfo-modal').checked = false;
		} else if (error.codeName === 'DuplicateKey') {
			formError.username = `Username ${username} is already taken.`;
		}
	};
</script>

<div class="modal">
	<div class="modal-box relative">
		<label for="userInfo-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Edit your profile</h3>
		<form on:submit|preventDefault={onSubmitUserInfo} class="my-5 flex flex-col items-center gap-3">
			<div class="form-control w-full max-w-xs">
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					placeholder="username"
					class="input input-bordered w-full max-w-xs"
					id="username"
					bind:value={username}
				/>
				{#if formError.username}
					<p class="text-error my-2">{formError.username}</p>
				{/if}
			</div>

			<div class="form-control w-full max-w-xs">
				<label class="label" for="bio">
					<span class="label-text">Bio</span>
				</label>
				<textarea
					class="textarea textarea-bordered h-24"
					placeholder={`About ${username} ...`}
					id="bio"
					bind:value={bio}
				/>
			</div>
		</form>
		<button
			class={submitLoading
				? 'btn btn-active btn-primary btn-xs loading'
				: 'btn btn-active btn-primary btn-xs'}
			disabled={submitLoading}
			type="submit"
			on:click={onSubmitUserInfo}>Submit</button
		>
	</div>
</div>
