<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	const games = [
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss',
			icon: 'noto:biting-lip'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss',
			icon: 'noto:biting-lip'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss',
			icon: 'noto:biting-lip'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss',
			icon: 'noto:biting-lip'
		}
	];
	const { room, templates } = $page.data;
</script>

<div class="grid grid-cols-2 gap-1 m-2 text-center">
	{#each templates as { name, icon, slug }}
		<a class="border h-30 border-dashed py-2 rounded-md" href={`/rooms/${room._id}/${slug}`}>
			<!-- <img src={image} class="w-24 mx-auto" alt={name} /> -->
			<Icon {icon} width="64" class="mx-auto" />
			<p>{name}</p>
		</a>
	{/each}
</div>
