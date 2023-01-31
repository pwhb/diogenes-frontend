<script>
	const state = {
		topLeft: false,
		topRight: false,
		bottomLeft: false,
		bottomRight: false,
		leftKissing: false,
		rightKissing: false
	};

	const svg = {
		watching: '/games/kissnbliss/eyes.svg',
		normal: '/games/kissnbliss/normal.svg',
		kissing: '/games/kissnbliss/kiss.svg',
		smiling: '/games/kissnbliss/smile.svg',
		ready: '/games/kissnbliss/ready.svg',
		heart: '/games/kissnbliss/heart.svg'
	};

	const competitive = false;

	const startKissing = () => {
		console.log('start kissing');
	};

	const stopKissing = () => {
		console.log('stop kissing');
	};
</script>

<div class="text-center">
	<p>rock paper scissors</p>
	<div class="grid grid-cols-3">
		<div class="mx-auto p-2 -scale-x-100">
			<img
				src={state.topLeft ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="topLeft"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2">
			<img
				src={state.topRight ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="topRight"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="flex flex-row justify-center">
			<img
				src={state.leftKissing ? svg.kissing : svg.smiling}
				class={state.leftKissing ? 'w-16' : 'w-16 -scale-x-100'}
				alt="topLeft"
			/>
			<img src={state.rightKissing ? svg.kissing : svg.smiling} class="w-16" alt="topLeft" />
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2 -scale-x-100">
			<img
				src={state.bottomLeft ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="bottomLeft"
			/>
		</div>
		<div class="mx-auto p-2" />
		<div class="mx-auto p-2">
			<img
				src={state.bottomRight ? svg.watching : svg.normal}
				class={competitive ? 'w-16' : 'invisible'}
				alt="bottomLeft"
			/>
		</div>
	</div>

	<button
		class="btn btn-outline hover:bg-red-500 w-full h-16"
		on:mousedown={startKissing}
		on:mouseup={stopKissing}
		on:touchstart={startKissing}
		on:touchend={stopKissing}
		><img class="h-12" src="/games/kissnbliss/kiss-button.svg" alt="" /></button
	>
</div>
