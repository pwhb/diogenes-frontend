<script>
	import AppBar from "$lib/components/chat/app_bar.svelte";
	import BottomBar from "$lib/components/chat/bottom_bar.svelte";



</script>
<div class="max-w-xl mx-auto min-h-screen bg-red-200 flex flex-col">
        <div class="">
            <AppBar/>
        </div>
        <div class="grow">
            <slot/>
        </div>
        <div class="">
            <BottomBar/>
        </div>
</div>