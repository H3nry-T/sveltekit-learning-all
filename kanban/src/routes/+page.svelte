<script lang="js">
	let form = {
		title: ''
	};
</script>

<h1>TODO KANBAN BOARD</h1>

<h2>Add todo:</h2>

<form on:submit|preventDefault>
	<fieldset>
		<label for="title" />
		<input type="text" id="title" bind:value={form.title} />
	</fieldset>
	<button type="submit">submit</button>
</form>
