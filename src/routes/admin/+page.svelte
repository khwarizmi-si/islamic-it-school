<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api, errorText, homeFor, session, signIn, type User } from '$lib/admin/session.svelte';

	let loading = $state(false);
	let error = $state('');
	let showPassword = $state(false);

	// Already signed in: skip the form.
	onMount(() => {
		if (session.token) api<User>('/user').then((u) => goto(homeFor(u.role))).catch(() => {});
	});

	async function login(e: SubmitEvent) {
		e.preventDefault();
		const f = new FormData(e.currentTarget as HTMLFormElement);
		loading = true;
		error = '';
		try {
			const data = await api<{ access_token: string; user: User }>('/login', {
				method: 'POST',
				body: JSON.stringify({ email: f.get('email'), password: f.get('password') })
			});
			signIn(data.access_token, data.user);
			goto(homeFor(data.user.role));
		} catch (err) {
			error = errorText(err, 'Login gagal');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Portal - Login</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-linear-to-r from-blue-500 to-purple-600 p-4">
	<div class="flex w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl md:flex-row">
		<div class="flex flex-col items-center justify-center rounded-t-2xl bg-blue-900 p-5 text-center text-white md:w-2/5 md:rounded-l-2xl md:rounded-tr-none">
			<h2 class="mb-2 text-3xl font-bold">Admin Portal</h2>
			<span class="mb-2 inline-block w-10 border-2 border-white"></span>
			<p class="mb-6">Masuk ke dashboard admin Anda</p>
		</div>
		<div class="p-5 md:w-3/5">
			<div class="mb-10 text-center">
				<h1 class="text-3xl font-bold text-blue-900">Selamat Datang</h1>
				<span class="mb-2 inline-block w-10 border-2 border-blue-900"></span>
			</div>
			<form class="space-y-6" onsubmit={login}>
				<label class="relative block">
					<span class="sr-only">Email</span>
					<span class="icon-[fa6-solid--envelope] absolute top-3 left-3 text-gray-400"></span>
					<input
						type="email"
						name="email"
						placeholder="Email"
						autocomplete="username"
						required
						class="w-full border-b-2 border-gray-300 p-2 pl-10 focus:border-blue-900 focus:outline-none"
					/>
				</label>
				<label class="relative block">
					<span class="sr-only">Password</span>
					<span class="icon-[fa6-solid--lock] absolute top-3 left-3 text-gray-400"></span>
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						placeholder="Password"
						autocomplete="current-password"
						required
						class="w-full border-b-2 border-gray-300 p-2 pr-10 pl-10 focus:border-blue-900 focus:outline-none"
					/>
					<button
						type="button"
						class="absolute top-3 right-3 text-gray-400"
						aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
						onclick={() => (showPassword = !showPassword)}
					>
						<span class={showPassword ? 'icon-[fa6-solid--eye-slash]' : 'icon-[fa6-solid--eye]'}></span>
					</button>
				</label>
				<button
					type="submit"
					disabled={loading}
					class="flex w-full justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 py-3 font-bold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 disabled:opacity-70"
				>
					{#if loading}
						<span class="size-6 animate-spin rounded-full border-t-2 border-r-2 border-white" aria-label="Memproses"></span>
					{:else}
						Masuk
					{/if}
				</button>
			</form>
			{#if error}
				<p class="mt-4 text-center text-red-500" role="alert">{error}</p>
			{/if}
		</div>
	</div>
</main>
