import { writable } from 'svelte/store';

export const todos = writable([]);

export function addTodo(todo: ITodo) {
	todos.update((todos) => [...todos, { ...todo, isDone: false }]);
}

export function deleteTodo(id) {
	todos.update((todos) => todos.filter((todo) => todo.id !== id));
}
