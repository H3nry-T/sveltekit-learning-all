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
 * @property {string} description
 * @property {number} row_number
 */

/**
 * creating a svelte store for todos
 * @type {import('svelte/store').Writable<Todo[]>}
 */

export const todos = writable([]);

/**
 * loads supabase todos into svelte store
 * @function loadTodos
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
 * inserts todo into the end of database
 * @param {{title: string}} todo
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function addTodos(todo, userId = 'test') {
	/*
		add a row_number to the todo object. It is dependent in column_number 1 and making sure it is the last index + 1
	*/
	const { data: readData, error: readError } = await supabase
		.from('todos')
		.select()
		.eq('column_number', 1)
		.order('id', { ascending: true });

	if (readError) {
		console.error(readError);
		throw readError;
	}
	console.log(readData);
	const { data: insertData, error: insertError } = await supabase
		.from('todos')
		.insert([
			{ title: todo.title, is_done: false, user_id: userId, row_number: readData.length + 1 }
		])
		.select();

	if (insertError) {
		console.error(insertError);
		throw insertError;
	}

	if (insertData) {
		todos.update((todos) => {
			return [...todos, insertData[0]];
		});
		console.log('todos store appended new todo');
	} else {
		console.log('no insertData');
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
	console.log(`${id} todo deleted`);
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

	console.log(`${id} todo toggled ${!todoIsDone}`);

	todos.update((todos) => {
		return todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, is_done: !todo.is_done };
			}
			return todo;
		});
	});
}

/**
 * @function updateColumnNumber
 * @param {number} id
 * @param {number} columnNumber
 */
export async function updateColumnNumber(id, columnNumber) {
	const { data, error } = await supabase
		.from('todos')
		.update({ column_number: columnNumber })
		.match({ id: id })
		.select();

	if (error) {
		console.error(error);
	}

	console.log(`${id} todo column number to ${columnNumber}`);

	todos.update((todos) => {
		return todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, column_number: columnNumber };
			}
			return todo;
		});
	});
}

/**
 * updates the row number using todo id
 * @function updateRowNumber
 * @param {number} id
 * @param {number} rowNumber
 */
export async function updateRowNumber(id, rowNumber) {
	const { data, error } = await supabase
		.from('todos')
		.update({ row_number: rowNumber })
		.match({ id: id })
		.select();

	if (error) {
		console.error(error);
	}

	console.log(`${id} todo row number to ${rowNumber}`);

	todos.update((todos) => {
		return todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, row_number: rowNumber };
			}
			return todo;
		});
	});
}
