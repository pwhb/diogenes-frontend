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
	const { room } = $page.data;
</script>

<div class="grid grid-cols-2 gap-1 m-2 text-center">
	<a class="border h-30 border-dashed py-2 rounded-md" href={`/rooms/${room._id}/kiss-and-bliss`}>
		<!-- <img src={image} class="w-24 mx-auto" alt={name} /> -->
		<Icon icon="noto:biting-lip" width="64" class="mx-auto" />
		<p>kiss and bliss</p>
	</a>

	<a class="border h-30 border-dashed py-2 rounded-md" href={`/rooms/${room._id}/sudoku`}>
		<!-- <img src={image} class="w-24 mx-auto" alt={name} /> -->
		<Icon icon="arcticons:sudoku" width="64" class="mx-auto" />
		<p>sudoku</p>
	</a>
	<a
		class="border h-30 border-dashed py-2 rounded-md"
		href={`/rooms/${room._id}/rock-paper-scissors`}
	>
		<Icon icon="twemoji:rock" width="64" class="mx-auto" />
		<p>rock paper scissors</p>
	</a>

	<a class="border h-30 border-dashed py-2 rounded-md" href={`/rooms/${room._id}/guess-the-number`}>
		<!-- <img src={image} class="w-24 mx-auto" alt={name} /> -->
		<Icon icon="ph:number-square-nine-bold" width="64" class="mx-auto" />
		<p>guess the number</p>
	</a>
</div>
