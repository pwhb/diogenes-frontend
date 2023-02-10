<script lang="ts">
	export let choices: any[] = [];
</script>

<select class="select select-bordered w-full max-w-xs">
	{#each choices as { label, value }}
		<option {value}>{label}</option>
	{/each}
</select>
