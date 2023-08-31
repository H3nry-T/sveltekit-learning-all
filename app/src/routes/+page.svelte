<script lang="ts">
	import SnippetCard from '../components/SnippetCard.svelte';
	import { addSnippet, snippetStore } from '../snippetStore';
	import type { PageData } from './$types';
	let formData: SnippetFormData = { title: '', language: '', snippet: '' };
	export let data: PageData;
	snippetStore.set(data.snippets);
</script>

<div class=" min-h-screen flex justify-center mb-10 mt-12 w-full">
	<div class="mx-auto w-[50%] flex flex-col items-center">
		<h1 class="h2">Create a code snippet</h1>
		<form class="rounded-lg bg-gray-800 p-4 mt-10 w-full max-w-2xl border border-slate-600">
			<fieldset class="border-b-2 pb-10 border-gray-500">
				<label for="title" class="label mb-2 text-lg font-semibold">title</label>
				<input
					type="text"
					name="title"
					id="title"
					class="input"
					placeholder="input your code snippet here..."
					required
					bind:value={formData.title}
				/>
			</fieldset>
			<fieldset class="border-b-2 pb-10 border-gray-500 mt-10">
				<label for="language" class="label mb-2 text-lg font-semibold">language</label>
				<select
					name="language"
					id="language"
					class="select"
					required
					bind:value={formData.language}
				>
					<option value="" disabled selected>pick a language</option>
					<option value="HTML">HTML</option>
					<option value="CSS">CSS</option>
					<option value="Typescript">Typescript</option>
				</select>
			</fieldset>
			<fieldset class="mt-10">
				<label for="snippet" class="label mb-2 text-lg font-semibold">Write code</label>
				<textarea
					name="snippet"
					id="snippet"
					cols="30"
					rows="10"
					class="textarea"
					placeholder="enter your code here..."
					required
					bind:value={formData.snippet}
				/>
			</fieldset>
			<button class="btn btn-md variant-form-material mt-4" on:click={() => addSnippet(formData)}
				>submit</button
			>
		</form>

		<br />

		<h2 class="h2 mt-12">Code snippets</h2>
		<section
			class="gap-4 card w-full max-w-3xl flex flex-col items-center mt-10 p-4 variant-ghost-primary"
		>
			{#each $snippetStore as snippet, index}
				<SnippetCard {...snippet} {index} />
			{/each}
		</section>
	</div>
</div>
