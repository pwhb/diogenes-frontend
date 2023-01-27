<script lang="ts">
	import { chatInput } from '$lib/store/chat';
	import Icon from '@iconify/svelte';
	let drawerOpen = false;
	export let onSend: () => void;
	const onOpenDrawer = () => {
		drawerOpen = !drawerOpen;
	};
</script>

<div class="btm-nav max-w-xl mx-auto">
	<form on:submit|preventDefault={onSend}>
		<div class="form-control w-full">
			<div class="input-group">
				<button class="btn btn-square" on:click={onOpenDrawer} type="button">
					<Icon icon="noto:video-game" width="24" />
				</button>
				<input
					type="text"
					placeholder="Say Hi ..."
					class="input input-bordered w-full"
					bind:value={$chatInput}
				/>

				<button class="btn btn-square" type="submit">
					<Icon icon="mdi:send" width="24" />
				</button>
			</div>
		</div>
		{#if drawerOpen}
			<div>
				<p>drawer</p>
			</div>
		{/if}
	</form>
</div>
