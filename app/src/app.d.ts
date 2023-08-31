// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface SnippetFormData {
	title: string;
	language: string;
	snippet: string;
}

interface CodeSnippet {
	title: string;
	language: string;
	snippet: string;
	favourite: boolean;
}
