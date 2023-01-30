<script>
	import { page } from '$app/stores';

	const games = [
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss'
		},
		{
			name: 'kiss and bliss',
			image: '/kiss-mark-svgrepo-com.svg',
			url: 'kiss-and-bliss'
		}
	];
	const { room } = $page.data;
</script>

<div class="grid grid-cols-2 gap-2 m-2 text-center">
	{#each games as { name, image, url }}
		<a class="border border-dashed py-2 rounded-md" href={`/rooms/${room._id}/${url}`}>
			<img src={image} class="w-24 mx-auto" alt={name} />
			<p>{name}</p>
		</a>
	{/each}
</div>
