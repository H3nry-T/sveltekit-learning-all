<script>
	import { userStore } from '$lib/stores/authStore';
	import { addTodos, deleteTodos, todos, updateToggleTodos } from '$lib/stores/todosStore';

	let form = {
		title: ''
	};
</script>

<section class="min-w-full min-h-screen px-20 py-10">
	<h1 class="text-2xl font-semibold leading-none capitalize md:text-4xl">svelte-kanban</h1>
	<section class="flex flex-col">
		<h2>kanban section goes here</h2>
		<form
			class="flex items-center justify-center w-full max-w-2xl gap-4 p-4 mx-auto text-gray-100 bg-gray-800 rounded-lg"
		>
			<fieldset class="flex items-center gap-4">
				<label class="text-lg font-semibold capitalize" for="title">title</label>
				<input
					class="w-full max-w-md px-2 py-0 text-gray-800 rounded-lg"
					type="text"
					name="title"
					id="title"
					bind:value={form.title}
					required
				/>
			</fieldset>
			<button
				type="submit"
				class="px-2 py-1 bg-blue-500 rounded-lg hover:bg-blue-700 active:bg-blue-800"
				on:click={async () => {
					if (form.title.length > 0) {
						await addTodos(form, $userStore?.id);

						form.title = '';
					}
				}}>submit</button
			>
		</form>
	</section>
	<section class="flex flex-col max-w-2xl gap-4 p-8 mx-auto mt-10 bg-gray-300 rounded-lg">
		{#each $todos as todo (todo.id)}
			<div class="flex items-center gap-4 p-4 bg-gray-400 rounded-lg">
				<input
					class="w-5 h-5 rounded-md form-checkbox"
					type="checkbox"
					name="is_done"
					id="is_done"
					value={todo.is_done}
					checked={todo.is_done}
					on:change={() => updateToggleTodos(todo.id, todo.is_done)}
				/>
				<p class={todo.is_done ? 'line-through' : null}>{todo.title}</p>
				<button
					class="px-1 py-2 ml-auto leading-none text-red-900 bg-red-300 rounded-lg"
					on:click={() => deleteTodos(todo.id)}>🗑️</button
				>
			</div>
		{/each}
	</section>
</section>
