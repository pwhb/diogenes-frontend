<script>
	import { page } from '$app/stores';
	// const user = JSON.parse($page.data.user);
</script>

{#if $page.data.user}
	<p>Welcome {$page.data.user.username}</p>
{/if}

