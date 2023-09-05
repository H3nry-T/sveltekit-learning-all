<script>
	import { supabase } from '../supabase';
	import GoogleIcon from './GoogleIcon.svelte';

	let loading = false;

	let email = '';

	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google'
			});

			if (error) {
				throw error;
			}
			console.log('logging in with goodle');
		} catch (/** @type {any} error */ error) {
			console.error(error);
			alert(`this is the error ${error.message}`);
		} finally {
			loading = false;
		}
	}
</script>

<section class="min-h-screen">
	<section class="flex justify-center w-full pt-10">
		<div class="relative mb-4">
			<div
				class="absolute inset-0.5 bg-gradient-to-tl from-blue-600 to-orange-500 filter blur-md animate-pulse opacity-90"
			>
				content
			</div>
			<div class="relative bg-gray-200 rounded-lg filter invert">
				<img src="/ice-cube-svgrepo-com-3.svg" class="w-40 h-40" alt="logo" />
			</div>
		</div>
	</section>

	<h1
		class="mt-4 text-lg font-extrabold tracking-wide text-center text-transparent uppercase md:text-2xl bg-clip-text bg-gradient-to-r from-blue-500 to-orange-600 filter saturate-200"
	>
		create an account
	</h1>

	<form on:submit|preventDefault={handleLogin} class="w-full max-w-3xl p-4 mx-auto mt-5">
		<fieldset class="relative block max-w-md mx-auto">
			<input
				class="w-full p-0 px-2 py-1 mt-6 placeholder-transparent rounded-lg peer placeholder-shown:mt-0"
				type="email"
				name="email"
				id="email"
				required
				bind:value={email}
				placeholder="email"
			/>
			<label
				for="email"
				class="block text-gray-800 font-base text-transparent absolute top-[-25px] left-[7px] peer-placeholder-shown:top-[5px] peer-placeholder-shown:left-[9px] peer-placeholder-shown:text-gray-500 transition-all duration-75 ease-linear"
				>www.example@mail.com</label
			>
			<label
				for="email"
				class="block font-semibold text-lg peer-placeholder-shown:text-transparent text-gray-800 absolute top-[-10px] left-[7px] peer-placeholder-shown:top-[5px] peer-placeholder-shown:left-[9px] peer-placeholder-shown:text-gray-500 transition-all duration-75 ease-linear"
				>Email:</label
			>
			<button
				class="group w-full flex justify-center px-3 py-2 mt-4 text-gray-100 rounded capitalize items-center divide-x divide-gray-100 hover:bg-gray-700 active:bg-gray-950 {loading
					? 'bg-red-800'
					: 'bg-gray-800'} "
				disabled={loading ? true : false}
			>
				<span class="block transition-all duration-75 ease-linear scale-125 group-hover:scale-150"
					>&rarr;</span
				>
				<span
					class="block pl-4 ml-4 leading-none transition-all duration-75 ease-linear group-hover:leading-5 group-hover:text-transparent from-blue-500 to-orange-500 bg-clip-text bg-gradient-to-r group-hover:font-semibold"
					>sign-in</span
				>
			</button>
		</fieldset>
		<section class="relative flex mt-32 mb-5 font-light uppercase">
			<div class="absolute inset-0 flex items-center">
				<span class="w-[80%] border-t border-gray-600 block mx-auto" />
			</div>
			<h3 class="relative block px-4 mx-auto bg-gray-100">or continue using</h3>
		</section>

		<button
			class=" px-3 py-2 mx-auto mt-1 text-gray-100 rounded capitalize flex items-center divide-x divide-gray-100 hover:bg-gray-700 active:bg-gray-950 {loading
				? 'bg-red-500'
				: 'bg-gray-800'} "
			disabled={loading ? true : false}
			><GoogleIcon width={20} height={20} /><span class="pl-4 ml-4 leading-none">
				google</span
			></button
		>
		<p
			class="absolute mt-10 leading-5 text-center text-gray-500 bottom-10 left-[50%] -translate-x-1/2"
		>
			By clicking continue,<br /> you agree to our
			<a href="/" class="text-gray-900 underline hover:text-gray-500">Terms of Service</a>
			and
			<a href="/" class="text-gray-900 underline hover:text-gray-500">Privacy Policy.</a>
		</p>
	</form>
</section>
