<script lang="ts">
	import { socket } from '$lib/socketio/socket';

	const competitive = false;

	const trueAnswer = 43;

	const guesses = [
		[12, 34],
		[34, 12]
	];

	const submitGuess = () => {
		socket.emit('');
	};
</script>

<div class="font-clock">
	<p class="text-center">guess the number</p>
	<br />
	<table class="table w-full text-center">
		<thead>
			<tr>
				<th>user1</th>
				<th>user2</th>
			</tr>
		</thead>
		<tbody>
			{#each guesses as guess}
				<tr>
					<td class="text-emerald-400">{guess[0]}</td>
					<td>{guess[1]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
