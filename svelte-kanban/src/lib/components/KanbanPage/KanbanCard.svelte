<script>
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	import { deleteTodos, updateToggleTodos } from '$lib/stores/todosStore';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import CardTransition from '../animation/CardTransition.svelte';

	/**
	 * @type {import('$lib/stores/todosStore').Todo} todo
	 */
	export let todo;

	/**
	 * @type {boolean} animateAddCard
	 */
	export let animateAddCard = false;

	let animateToggle = false;
	function playAnimation(duration = 500) {
		animateToggle = true;
		const clearTimeout = setTimeout(() => {
			animateToggle = false;
		}, duration);
	}
</script>

<Card.Root
	class="min-w-fit  transition-all duration-300 ease-in-out relative  
	{animateToggle ? 'border-accent-foreground' : null}
	{animateAddCard ? 'border-accent-foreground' : null}
	"
>
	<Button
		variant="destructive"
		class="absolute top-1 right-1 h-[25px] p-0 bg-clip-text"
		size="default"
		on:click={() => deleteTodos(todo.id)}
		><X class="text-primary" />
	</Button>

	<section class="flex">
		<Card.Header class="py-2 pl-3 max-w-[220px] 2xl:max-w-xs">
			<Card.Title
				class="text-base md:text-lg transition-colors duration-1000  ease-linear truncate first-letter:capitalize {todo.is_done ||
				todo.column_number === 3
					? 'line-through text-muted-foreground'
					: ''}">{todo.title}</Card.Title
			>
			<!-- {#if todo.description.length > 0}
				<Card.Description class="truncate">
					description here Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis sed
					nostrum non laborum esse voluptates, doloribus exercitationem dolor, ad atque id quas
					velit inventore adipisci quod unde, pariatur quisquam dolorum!</Card.Description
				>
			{/if} -->
		</Card.Header>
		<section class="flex justify-between w-full">
			<Checkbox
				checked={todo.is_done || todo.column_number === 3}
				onCheckedChange={() => {
					updateToggleTodos(todo.id, todo.is_done);
					playAnimation();
				}}
				class="self-center"
			/>
		</section>
	</section>
	<Card.Footer class="flex items-center px-2 py-2">
		<div class="">
			{#if todo.column_number === 1}
				<Badge class="text-blue-800 bg-blue-300 pointer-events-none " variant="outline"
					>ice-box</Badge
				>
			{:else if todo.column_number === 2}
				<Badge class="text-yellow-800 bg-yellow-300 pointer-events-none" variant="secondary"
					>in-progress</Badge
				>
			{:else}
				<Badge class="text-green-800 bg-green-300 pointer-events-none">done</Badge>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
