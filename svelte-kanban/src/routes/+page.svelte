<script>
	import KanbanCard from '$lib/components/KanbanPage/KanbanCard.svelte';
	import CardTransition from '$lib/components/animation/CardTransition.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import { userStore } from '$lib/stores/authStore';
	import { animateAddCard, playAddCardAnimation } from '$lib/stores/cardAnimationStore';
	import { addTodos, loadTodos, todos, prevTodos, isDeleting } from '$lib/stores/todosStore';
	import { Plus } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let form = {
		title: ''
	};

	/**
	 * @type {import('$lib/stores/todosStore').Todo} lastTodo
	 */
	$: lastTodo = $todos[$todos.length - 1];
</script>

<section class="min-w-full min-h-screen px-5 md:px-20">
	<h1 class="mb-10 text-2xl font-semibold leading-7 capitalize md:text-4xl">svelte-kanban</h1>

	<form
		class="flex items-center justify-center w-full max-w-sm gap-4 mb-5 rounded-lg bg-card text-card-foreground"
		on:submit|preventDefault={async () => {
			if (form.title.length > 0) {
				await addTodos(form, $userStore?.id);
				playAddCardAnimation(500);
				form.title = '';
			}
		}}
	>
		<fieldset class="flex items-center w-full gap-4">
			<Input
				class="w-full max-w-2xl py-0"
				bind:value={form.title}
				type="text"
				name="title"
				id="title"
				required
				placeholder="Add todo"
			/>
			<Button class="py-0" size={'icon'} type="submit"><Plus /></Button>
		</fieldset>
	</form>

	<section class="pb-10 overflow-x-scroll lg:overflow-x-auto">
		<section class="grid items-start grid-cols-3 gap-4 mt-10 min-w-[1000px]">
			<Card.Root class="flex flex-col w-full gap-4 p-5 pt-4 min-w-fit">
				<h2
					class="text-xl font-semibold tracking-tight md:text-2xl first-letter:capitalize text-secondary-foreground"
				>
					ice-box
				</h2>
				{#each $todos.filter((t) => t.column_number === 1) as todo (todo.id)}
					<div in:fly={{ y: 10 }} out:fly={{ y: -10 }}>
						{#if todo.id === lastTodo.id}
							<KanbanCard {todo} animateAddCard={$animateAddCard} />
						{:else}
							<KanbanCard {todo} />
						{/if}
					</div>
				{/each}
			</Card.Root>
			<Card.Root class="flex flex-col w-full gap-4 p-5 pt-4 min-w-fit">
				<h2
					class="text-xl font-semibold tracking-tight md:text-2xl first-letter:capitalize text-secondary-foreground"
				>
					in-progress
				</h2>
				{#each $todos.filter((t) => t.column_number === 2) as todo (todo.id)}
					<div in:fly={{ y: 10 }} out:fly={{ y: -10 }}>
						<KanbanCard {todo} />
					</div>
				{/each}
			</Card.Root>
			<Card.Root class="flex flex-col w-full gap-4 p-5 pt-4 min-w-fit">
				<h2
					class="text-xl font-semibold tracking-tight md:text-2xl first-letter:capitalize text-secondary-foreground"
				>
					done
				</h2>
				{#each $todos.filter((t) => t.column_number === 3) as todo (todo.id)}
					<div in:fly={{ y: 10 }} out:fly={{ y: -10 }}>
						<KanbanCard {todo} />
					</div>
				{/each}
			</Card.Root>
		</section>
	</section>
</section>
