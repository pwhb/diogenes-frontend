<script lang="ts">
	import type { ActionData } from '../$types';

	let showPassword = false;

	export let form: ActionData;

	console.log('form', form);
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="card w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body item">
			<div class="card-body p-0 items-center text-center">
				<h2 class="card-title">Sign in to your account</h2>
			</div>

			<form action="" method="POST">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="username"
						class={`input input-bordered ${form?.invalid?.username ? 'input-error' : ''}`}
						value={form?.previous?.username || ''}
					/>
					{#if form?.invalid?.username}
						<p class="text-error my-2">{form.invalid.username}</p>
					{/if}
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						placeholder="password"
						class={`input input-bordered ${form?.invalid?.password ? 'input-error' : ''}`}
					/>
					{#if form?.invalid?.password}
						<p class="text-error my-2">{form.invalid.password}</p>
					{/if}
				</div>
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">Show Password</span>
						<input
							type="checkbox"
							bind:checked={showPassword}
							class="checkbox checkbox-secondary"
						/>
					</label>
				</div>
				<div class="card-body p-0 items-center text-center my-4">
					<a href="/welcome/join" id="login-link" class="label-text-alt link link-hover"
						>Don't have a diogenes account? Create one!</a
					>
				</div>
				<div class="form-control">
					<button class="btn btn-primary" type="submit">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
