import { get, writable } from 'svelte/store';

export const snippetStore = writable<CodeSnippet[]>([]);

export function addSnippet(snippet: SnippetFormData) {
	snippetStore.update((snippets) => {
		return [...snippets, { ...snippet, favourite: false }];
	});
}

export function updateSnippet(index: number) {
	snippetStore.update((snippets) => {
		return snippets.map((s) => {
			if (index === snippets.indexOf(s)) {
				return { ...s, favourite: !s.favourite };
			}
			return { ...s };
		});
	});
}

export function deleteSnippet(index: number) {
	snippetStore.update((snippets) => {
		return snippets.filter((s, i) => i !== index);
	});
}
