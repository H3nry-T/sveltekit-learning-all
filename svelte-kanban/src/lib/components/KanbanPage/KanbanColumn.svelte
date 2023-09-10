<script>
	import {
		updateRowNumbersForColumn,
		todos,
		updateColumnNumber,
		updateRowNumber
	} from '$lib/stores/todosStore';
	import { fly } from 'svelte/transition';
	import * as Card from '../ui/card/index';
	import KanbanCard from './KanbanCard.svelte';
	import {
		animateAddCard,
		finalizingCard,
		playAddCardAnimation,
		playFinalizeCardAnimation
	} from '$lib/stores/cardAnimationStore';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	/**
	 * @type {import('$lib/stores/todosStore').Todo[]}
	 */
	export let column;

	/**
	 * @type {number} columnNumber
	 */
	export let columnNumber;

	let flipDurationMs = 200;

	/**
	 *
	 * @param {*} e
	 */
	function handleConsider(e) {
		column = e.detail.items;
	}

	/**
	 * @param {CustomEvent<import('svelte-dnd-action').DndEvent<import('$lib/stores/todosStore').Todo>>} e
	 */
	async function handleFinalize(e) {
		try {
			const syncedColumnRows = e.detail.items.map((todo, index) => {
				return { ...todo, row_number: index + 1 };
			});
			column = syncedColumnRows;
			console.log(`syncedList moving rows in column ${columnNumber}`);
			console.log(syncedColumnRows);
			const id = +e.detail.info.id;
			finalizingCard.set(id);
			playFinalizeCardAnimation(500);
			const draggedTodo = $todos.find((todo) => {
				return todo.id === id;
			});
			await updateRowNumbersForColumn(syncedColumnRows);
			if (!(draggedTodo?.column_number === columnNumber)) {
				await updateColumnNumber(id, columnNumber);
			}
		} catch (error) {
			console.log(error);
			throw new Error(`${error}`);
		}
	}
</script>

<section class="md:min-h-screen">
	<Card.Root class="w-full p-5 pt-4 min-w-fit">
		<h2
			class="mb-4 text-xl font-semibold tracking-tight md:text-2xl first-letter:capitalize text-secondary-foreground"
		>
			{columnNumber === 1 ? 'ice-box' : columnNumber === 2 ? 'in-progress' : 'done'}
		</h2>
		<slot />
		{#if columnNumber === 1}
			<div
				use:dndzone={{ items: column, flipDurationMs }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
				class="flex flex-col gap-4 min-h-[100px] pb-10"
			>
				{#each column as todo (todo.id)}
					<div animate:flip={{ duration: flipDurationMs }}>
						{#if todo.id === $todos[$todos.length - 1].id}
							<KanbanCard {todo} isLast={true} />
						{:else}
							<KanbanCard {todo} />
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div
				use:dndzone={{ items: column, flipDurationMs }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
				class="flex flex-col gap-4 min-h-[100px] pb-10"
			>
				{#each column as todo (todo.id)}
					<div animate:flip={{ duration: flipDurationMs }}>
						<KanbanCard {todo} />
					</div>
				{/each}
			</div>
		{/if}
	</Card.Root>
</section>
