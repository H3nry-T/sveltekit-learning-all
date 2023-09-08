import { writable } from 'svelte/store';
import { supabase } from '../supabase';
/**
 * @typedef {Object} Todo
 * @property {number} column_number
 * @property {string} created_at
 * @property {number} id
 * @property {boolean} is_done
 * @property {string} title
 * @property {string} user_id
 */

/**
 * creating a svelte store for todos
 * @type {import('svelte/store').Writable<Todo[]>}
 */

export const todos = writable([]);

/**
 * creating a svelte store for prevTodos
 * @type {import('svelte/store').Writable<Todo[]>} prevTodos
 */

export const prevTodos = writable([]);

/**
 * creating a svelte store for prevTodos
 * @type {import('svelte/store').Writable<boolean>} isDeleting
 */
export const isDeleting = writable(false);

/**
 * loads supabase todos into svelte store
 * @returns {Promise<void>}
 */

export async function loadTodos() {
	const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
	if (error) {
		console.error(error);
	}

	console.log(`supabase read and load into svelte store`);
	// console.debug(data);
	// console.log(data?.[data.length - 1]);
	todos.set(/** @type {Todo[]} */ (data));
	prevTodos.set(/** @type {Todo[]} */ (data));
}

/**
 * get todo from database using id
 * @param {number} id - number
 * @returns {Promise<Todo>}
 */
export async function getTodosById(id) {
	const { data, error } = await supabase.from('todos').select().match({ id });

	if (error) {
		console.error(error);
		throw error;
	}
	return data?.[0];
}
/**
 * @param {{title: string}} todo
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function addTodos(todo, userId = 'test') {
	const { data, error } = await supabase
		.from('todos')
		.insert([{ title: todo.title, is_done: false, user_id: userId }])
		.select();

	if (error) {
		console.log(error);
		console.log(data);
	}
	console.log('supabase insert complete');

	if (data) {
		todos.update((todos) => {
			prevTodos.set(todos);
			return [...todos, data[0]];
		});
		console.log('todos store updated');
	} else {
		console.log('no data');
	}
}

/**
 * Delete todos using id
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteTodos(id) {
	isDeleting.set(true);
	const { error } = await supabase.from('todos').delete().match({ id: id });
	if (error) {
		console.error(error);
	}

	todos.update((todos) => {
		return todos.filter((todo) => todo.id !== id);
	});

	isDeleting.set(false);
}

/**
 * updates the todos using id
 * @param {number} id
 * @param {boolean} todoIsDone
 * @returns {Promise<void>}
 */
export async function updateToggleTodos(id, todoIsDone) {
	const { data, error } = await supabase
		.from('todos')
		.update({ is_done: !todoIsDone })
		.match({ id: id })
		.select();

	if (error) {
		console.error(error);
	}

	todos.update((todos) => {
		return todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, is_done: !todo.is_done };
			}
			return todo;
		});
	});
}
