<script>
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	import { animateAddCard } from '$lib/stores/cardAnimationStore';
	import { deleteTodos, updateToggleTodos } from '$lib/stores/todosStore';
	import { FileEdit, X } from 'lucide-svelte';

	/**
	 * @type {import('$lib/stores/todosStore').Todo} todo
	 */
	export let todo;

	export let outsideAnimateToggle = false;

	export let isLast = false;

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
	{$animateAddCard && isLast ? 'border-accent-foreground' : null}
	{outsideAnimateToggle ? 'border-accent-foreground' : null}
	"
>
	<section class="absolute flex items-center gap-1 top-1 right-1">
		<Checkbox
			checked={todo.is_done}
			onCheckedChange={() => {
				updateToggleTodos(todo.id, todo.is_done);
				playAnimation();
			}}
			class="grid self-center w-5 h-5 border place-items-center"
		/>
		<Button
			class="p-0 h-[25px] w-[25px] leading-none border bg-card group hover:bg-gray-400/10"
			size="icon"
			variant="secondary"
			><FileEdit
				size={20}
				class="transition-all duration-300 ease-in-out group-hover:text-gray-400"
			/></Button
		>
		<Button
			variant="destructive"
			size="icon"
			class="p-0 border group h-[25px] w-[25px] bg-card hover:bg-red-100"
			on:click={() => deleteTodos(todo.id)}
			><X class="transition-all duration-300 ease-in-out text-primary group-hover:text-red-900" />
		</Button>
	</section>

	<section class="flex">
		<Card.Header class="py-2 pl-3 max-w-[220px] 2xl:max-w-xs">
			<Card.Title
				class="text-base md:text-lg transition-colors duration-1000  ease-linear truncate first-letter:capitalize {todo.is_done
					? 'line-through text-muted-foreground'
					: ''}">{todo.title}</Card.Title
			>
			{#if todo.description.length > 0}
				<Card.Description class="truncate">{todo.description}</Card.Description>
			{/if}
		</Card.Header>
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
