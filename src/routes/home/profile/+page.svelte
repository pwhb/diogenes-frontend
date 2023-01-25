<script>
	import { page } from '$app/stores';
</script>

<h1>profile</h1>
<p>Welcome {$page.data.user.username}</p>
<form action="/logout" method="post">
	<button type="submit">Log out</button>
</form>
