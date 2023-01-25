<script>
	import { page } from '$app/stores';
	import BottomNavigator from '$lib/components/bottom_navigator.svelte';	
</script>

<h1>Home</h1>

{#if $page.data.user}
	<p>Welcome {$page.data.user.username}</p>
	<form action="/logout" method="post">
		<button type="submit">Log out</button>
	</form>
{/if}

<BottomNavigator />
