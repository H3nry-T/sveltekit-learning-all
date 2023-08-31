import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		snippets: [
			{
				title: "Henry's snippet",
				language: 'HTML',
				snippet: '<h1>This is a snippet</h1>',
				favourite: false
			},
			{
				title: 'Some snippet',
				language: 'Typescript',
				snippet: 'function add(a: number, b: number) { return a + b; }',
				favourite: false
			}
		]
	};
};
