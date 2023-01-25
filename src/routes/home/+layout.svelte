<script>
	import { page } from '$app/stores';
	import BottomNavigator from '$lib/components/bottom_navigator.svelte';
</script>

<div class="max-w-xl mx-auto">
	<slot />
	<BottomNavigator />
</div>
