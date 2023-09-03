import { writable } from 'svelte/store';
import { supabase } from '../supabase';
/**
 * @typedef {Object} Todo
 * @property {number | null} column_number
 * @property {string} created_at
 * @property {number} id
 * @property {boolean | null} is_done
 * @property {string | null} title
 * @property {string | null} user_id
 */

/**
 * creating a svelte store for todos
 * @type {import('svelte/store').Writable<Todo[]>}
 */

export const todos = writable([]);

/**
 * loads supabase todos into svelte store
 * @returns {Promise<void>}
 */

export async function loadTodos() {
	const { data, error } = await supabase.from('todos').select('*');
	if (error) {
		console.error(error);
	}

	todos.set(/** @type {Todo[]} */ (data));
}

/**
 * @param {{title: string}} todo
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function addTodos(todo, userId = 'test') {
	const { data, error } = await supabase
		.from('todos')
		.insert([
			{
				title: todo.title,
				userId: userId
			}
		])
		.select();

	if (error) {
		console.error(error, data);
	}

	if (data) {
		todos.update((todos) => [...todos, data[0]]);
	}
}

/**
 * Delete todos using id
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteTodos(id) {
	const { error } = await supabase.from('todos').delete().match({ id: id });
	if (error) {
		console.error(error);
	}

	todos.update((todos) => {
		return todos.filter((todo) => todo.id !== id);
	});
}

/**
 * updates the todos using id
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function updateToggleTodos(id) {
	todos.update((todos) => {
		return todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, is_done: !todo.is_done };
			}
			return todo;
		});
	});
}
