<script>
	import { gameState } from '$lib/store/game';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	console.log($gameState);

	onMount(() => {
		console.log('rps');
	});
</script>

<div class="flex flex-col flex-grow">
	<div class="flex flex-col flex-grow justify-between items-center my-20">
		<div class="rotate-180">
			<Icon width={'80'} class="size-changing" icon="noto:waving-hand-medium-light-skin-tone" />
		</div>

		<Icon width={'24'} icon="noto-v1:vs-button" />
		<div>
			<Icon width={'80'} class="size-changing" icon="noto:waving-hand-medium-light-skin-tone" />
		</div>
	</div>

	<div class="flex flex-row gap-10 items-center justify-center mb-20">
		<button class="hover:scale-125 -rotate-12">
			<Icon width={'54'} icon="noto:raised-fist-medium-light-skin-tone" />
		</button>
		<button class="hover:scale-125">
			<Icon width={'54'} icon="noto:hand-with-fingers-splayed-medium-light-skin-tone" />
		</button>
		<button>
			<Icon class="hover:scale-125 rotate-12" width={'54'} icon="noto:victory-hand-medium-light-skin-tone" />
		</button>
	</div>
</div>
