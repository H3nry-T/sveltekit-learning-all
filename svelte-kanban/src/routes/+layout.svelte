<script>
	import '../app.css';
	import Auth from '../lib/components/Auth.svelte';
	import { userStore } from '../lib/stores/authStore';
	import { loadTodos } from '../lib/stores/todosStore';
	import { supabase } from '../lib/supabase';

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();
		userStore.set(null);
	}

	async function loadUser() {
		const response = await supabase.auth.getUser();

		const supabaseUser = response.data.user;

		if (supabaseUser) {
			userStore.set(supabaseUser);
		}
	}

	supabase.auth.onAuthStateChange((event, session) => {
		if (session?.user) {
			console.log(event, session);
			console.log(session?.user);
			userStore.set(session?.user);

			loadTodos();
		}
	});

	loadUser();
</script>

<section class="text-gray-800 bg-gray-100">
	{#if $userStore}
		<nav class="p-10">
			<button class="block p-4 ml-auto text-red-900 bg-red-300 rounded-lg" on:click={handleSignOut}
				>signout
			</button>
		</nav>
		<slot />
	{:else}
		<Auth />
	{/if}
</section>
