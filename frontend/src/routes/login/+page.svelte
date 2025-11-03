<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import left from '$lib/assets/left.svg';
  import Input from '../../components/login/input.svelte';

  let isLogin = $state(true);
  let username = $state("");
  let email = $state("");
  let password = $state("");
  let firstName = $state("");
  let lastName = $state("");
  let phoneNumber = $state("");
  let confirmPassword = $state("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = {
      'username': username,
      'first_name': firstName,
      'last_name': lastName,
      'password': password,
      'email': email,
      'phone_number': phoneNumber
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    
    const response = fetch(
      `${PUBLIC_BACKEND_URL}/create-user`, options
    ).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log("Success", data);
    })

  }

  function toggleMode() {
    isLogin = !isLogin;
    confirmPassword = '';
  }

  $inspect(email, password, firstName, lastName, confirmPassword, phoneNumber);
</script>

<div> 
  <a href="/">
    <img class="mt-2 mr-8 max-h-8 max-w-8" src={left}/>
  </a>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="border border-black p-8">
        <h1 class="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <Input
            id="username"
            bind:value={username}
            label="Username"
          />
          <div>
            <label for="password" class="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              bind:value={password}
              class="w-full px-3 py-2 border border-black focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {#if !isLogin}
            <div>
              <Input
                bind:value={email}
                id="email"
                label="Email"
              />
              <Input
               bind:value={firstName} 
               id="firstName"
               label="First Name"
              />
              <Input
                bind:value={lastName}
                id="lastName"
                label="Last Name"
              />
              <Input
                type="tel"
                id="phoneNumber"
                bind:value={phoneNumber}
                label="Phone Number"
              />
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
            class="w-full py-2 px-4 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button on:click={toggleMode} class="text-sm hover:underline on:cursor-pointer">
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
