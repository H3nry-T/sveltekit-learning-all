<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { deleteSnippet, updateSnippet } from '../snippetStore';

	export let index: number;

	export let title: string;
	export let language: string;
	export let snippet: string;
	export let favourite: boolean;
</script>

<div class="card max-w-2xl w-full py-2 px-4">
	<header class="card-header flex justify-between">
		<h3 class="h5 first-letter:capitalize">{title}</h3>
		<div>
			<button
				class={` btn btn-sm font-semibold  ${
					favourite ? 'variant-filled-secondary' : 'variant-filled-surface'
				}`}
				on:click={(e) => updateSnippet(index)}>{favourite ? 'unfavourite' : 'favourite'}</button
			>
			<button class="btn btn-sm variant-filled-error" on:click={() => deleteSnippet(index)}
				>🗑️</button
			>
		</div>
	</header>
	<section class="mt-4">
		<CodeBlock {language} code={snippet} />
	</section>
	<footer class="card-footer" />
</div>
