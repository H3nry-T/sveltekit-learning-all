<script>
	import { supabase } from '../supabase';

	/**
	 * @type {string} email
	 */
	let email = '';
	/**
	 * @type {boolean} loading
	 */
	let loading = false;

	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) {
				throw error;
			}
			alert('check your email for the magic link :)');
		} catch (/** @type {any} error */ error) {
			console.error(error);
			alert(`this is the error ${error.message}`);
		} finally {
			loading = false;
		}
	}
</script>

<section class="min-h-screen">
	<h2 class="pt-20 text-lg font-semibold text-center md:text-2xl">
		Login from here using your email:
	</h2>

	<form
		on:submit|preventDefault={handleLogin}
		class="w-full max-w-3xl p-4 mx-auto mt-5 bg-gray-300"
	>
		<fieldset class="flex flex-col items-center gap-4">
			<label for="email" class="text-xl font-semibold capitalize">email: </label>
			<input
				class="w-full max-w-md p-0 px-2 py-1 mx-auto rounded-lg"
				type="email"
				name="email"
				id="email"
				required
				bind:value={email}
			/>
		</fieldset>
		<button
			class="block px-2 py-1 mx-auto mt-5 text-gray-100 rounded hover:bg-blue-700 active:bg-blue-800 {loading
				? 'bg-red-500'
				: 'bg-blue-500'} "
			disabled={loading ? true : false}>login</button
		>
	</form>
</section>
