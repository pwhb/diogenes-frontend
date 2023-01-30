<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	let pathname = '';
	const menuButtons = [
		{
			icon: 'fa6-solid:circle-user',
			href: '/home/profile'
		},
		{
			icon: 'material-symbols:home',
			href: '/home'
		},
		{
			icon: 'fa6-solid:comment',
			href: '/home/chat'
		}
	];

	page.subscribe((val) => {
		pathname = val.url.pathname;
	});
</script>

<div class="btm-nav max-w-xl mx-auto">
	<!-- <button class="text-secondary active">
		<Icon icon="material-symbols:home" width="24" />
	</button>
	<button class="">
		<Icon icon="fa6-solid:comment" width="24" />
	</button>
	<button class="">
		<Icon icon="fa6-solid:circle-user" width="24" />
	</button> -->
	{#each menuButtons as { icon, href }}
		<a class={href === pathname ? 'text-secondary active' : ''} {href}>
			<Icon {icon} width="24" />
		</a>
	{/each}
</div>
