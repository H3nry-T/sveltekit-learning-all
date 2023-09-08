<script>
	import ColorPalette from '$lib/components/ColorPalette.svelte';
	import ToggleLightDarkMode from '$lib/components/ToggleLightDarkMode.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';
	import Auth from '../lib/components/AuthPage/Auth.svelte';
	import { userStore } from '../lib/stores/authStore';
	import { loadTodos } from '../lib/stores/todosStore';
	import { supabase } from '../lib/supabase';

	import { LogOut } from 'lucide-svelte';

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

<section>
	{#if $userStore}
		<nav class="flex items-center justify-between w-full gap-4 p-10">
			<ToggleLightDarkMode />
			<Button variant="default" on:click={handleSignOut}><LogOut size={22} /></Button>
		</nav>
		<slot />
	{:else}
		<Auth />
	{/if}

	<ColorPalette />
</section>
