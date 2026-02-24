<script>
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Input from '../../components/login/input.svelte';
	import Retvrn from '../../components/retvrn.svelte';

	import { api } from '../../utils/api.svelte';

	let isLogin = $state(true);
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let phoneNumber = $state('');
	let confirmPassword = $state('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		let data = {};

		if (isLogin) {
			data = {
				username: username,
				password: password
			};

			await api.post('/users/login', data);

			return;
		}

		if (!isLogin && password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		data = {
			username: username,
			first_name: firstName,
			last_name: lastName,
			password: password,
			email: email,
			phone_number: phoneNumber
		};

		await api.post('/users/create-user', data);
	};

	function toggleMode() {
		isLogin = !isLogin;
		confirmPassword = '';
	}
</script>

<div>
	<Retvrn />
	<div class="flex min-h-screen items-center justify-center bg-white p-4">
		<div class="w-full max-w-md">
			<div class="border border-black p-8">
				<h1 class="mb-6 text-center text-2xl font-bold">
					{isLogin ? 'Login' : 'Sign Up'}
				</h1>

				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					<Input id="username" bind:value={username} label="Username" />
					<div>
						<label for="password" class="mb-1 block text-sm font-medium"> Password </label>
						<input
							type="password"
							id="password"
							bind:value={password}
							class="w-full border border-black px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
							required
						/>
					</div>

					{#if !isLogin}
						<div>
							<Input bind:value={email} id="email" label="Email" />
							<Input bind:value={firstName} id="firstName" label="First Name" />
							<Input bind:value={lastName} id="lastName" label="Last Name" />
							<Input type="tel" id="phoneNumber" bind:value={phoneNumber} label="Phone Number" />
							<Input
								type="password"
								id="confirmPassword"
								bind:value={confirmPassword}
								label="Confirm Password"
							/>
						</div>
					{/if}

					<button
						type="submit"
						class="w-full border border-black bg-black px-4 py-2 text-white transition-colors hover:bg-white hover:text-black"
					>
						{isLogin ? 'Login' : 'Sign Up'}
					</button>
				</form>

				<div class="mt-6 text-center">
					<button on:click={toggleMode} class="on:cursor-pointer text-sm hover:underline">
						{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
