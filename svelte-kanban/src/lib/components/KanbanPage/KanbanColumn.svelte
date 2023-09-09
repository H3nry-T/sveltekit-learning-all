<script>
	import { todos, updateColumnNumber } from '$lib/stores/todosStore';
	import { fly } from 'svelte/transition';
	import * as Card from '../ui/card/index';
	import KanbanCard from './KanbanCard.svelte';
	import { animateAddCard } from '$lib/stores/cardAnimationStore';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	/**
	 * @type {import('$lib/stores/todosStore').Todo[]}
	 */
	export let list;

	/**
	 * @type {number} columnNumber
	 */
	export let columnNumber;

	/**
	 *
	 * @param {*} e
	 */
	function handleConsider(e) {
		list = e.detail.items;
	}

	/**
	 *
	 * @param {number} id
	 * @param {number} columnNumber
	 */

	/**
	 * @param {CustomEvent<import('svelte-dnd-action').DndEvent<import('$lib/stores/todosStore').Todo>>} e
	 */
	async function handleFinalize(e) {
		try {
			list = e.detail.items;
			const id = +e.detail.info.id;
			console.log(id);
			console.log(columnNumber);
			const draggedTodo = $todos.find((todo) => {
				return todo.id === id;
			});
			if (!(draggedTodo?.column_number === columnNumber)) {
				await updateColumnNumber(id, columnNumber);
			}
		} catch (error) {
			console.log(error);
			throw new Error(`${error}`);
		}
	}

	/**
	 * @type {import('$lib/stores/todosStore').Todo} lastTodo
	 */
	$: lastTodo = $todos[$todos.length - 1];

	let flipDurationMs = 200;
</script>

<section class="min-h-screen">
	<Card.Root class="w-full p-5 pt-4 min-w-fit">
		<h2
			class="mb-4 text-xl font-semibold tracking-tight md:text-2xl first-letter:capitalize text-secondary-foreground"
		>
			{columnNumber === 1 ? 'ice-box' : columnNumber === 2 ? 'in-progress' : 'done'}
		</h2>
		<slot />
		{#if columnNumber === 1}
			<div
				use:dndzone={{ items: list, flipDurationMs }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
				class="flex flex-col gap-4 min-h-[100px] pb-10"
			>
				{#each list as todo (todo.id)}
					<div animate:flip={{ duration: flipDurationMs }}>
						{#if todo.id === lastTodo.id}
							<KanbanCard {todo} isLast={true} />
						{:else}
							<KanbanCard {todo} />
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div
				use:dndzone={{ items: list, flipDurationMs }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
				class="flex flex-col gap-4 min-h-[100px] pb-10"
			>
				{#each list as todo (todo.id)}
					<div animate:flip={{ duration: flipDurationMs }}>
						<KanbanCard {todo} />
					</div>
				{/each}
			</div>
		{/if}
	</Card.Root>
</section>
