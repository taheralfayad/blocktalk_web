<script>
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Entry from '../components/entry.svelte';
	import rightArrow from '$lib/assets/right.svg';
	import { getDistance, getLocationSearchValue } from '../states/searchBarState.svelte.js';
	import { getFeed } from '../states/feed.svelte.js';
	import { fly } from 'svelte/transition';

	let { entriesShown } = $props();
	let feed = $state([]);

	const closeMenu = () => {
		entriesShown.shown = false;
	};
	let isLoggedIn = $state(false);

	$effect(() => {
		feed = getFeed();
		if (localStorage.getItem('access_token')) {
			isLoggedIn = true;
		}
	});
</script>

{#if entriesShown.shown}
	<div class="fixed inset-0 z-50 flex">
		<div class="flex-1 bg-black opacity-25" on:click={closeMenu}></div>
		<div
			class="relative flex h-full w-2/5 flex-col bg-white shadow-lg"
			transition:fly={{ x: 100, duration: 300 }}
		>
			<button class="hover:cursor-pointer" on:click={closeMenu}>
				<img class="max-h-8 max-w-8" src={rightArrow} alt="Close" />
			</button>
			<div class="flex flex-1 flex-col overflow-y-auto p-4">
				{#if feed.length > 0}
					{#each feed as item}
						<Entry title={item.title} address={item.address} content={item.content} />
					{/each}
				{:else}
					<p>No entries found for this area :(</p>
					<p>You can add some by joining the BlockTalk community as a contributor!</p>
				{/if}
			</div>

			<div class="border-t border-gray-200">
				<a
					href="/about"
					class="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
				>
					About
				</a>

				{#if isLoggedIn}
					<a
						href="/create-entry"
						class="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50"
					>
						Participate
					</a>
				{:else}
					<a
						href="/login"
						class="block w-full px-4 py-3 text-left font-semibold transition-colors hover:bg-gray-50"
					>
						Login
					</a>
				{/if}
			</div>
		</div>
	</div>
{/if}
