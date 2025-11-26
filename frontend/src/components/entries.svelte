<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Entry from '../components/entry.svelte';
  import rightArrow from '$lib/assets/right.svg';
  import { getDistance, getLocationSearchValue } from '../states/searchBarState.svelte.js';
  import { getFeed } from '../states/feed.svelte.js';

  let { entriesShown } = $props();
  let feed = $state('');

  const closeMenu = () => {
    entriesShown.shown = false;
  };
  let isLoggedIn = $state(false);

  $effect(() => {
    feed = getFeed();
    if (localStorage.getItem("access_token")){
      isLoggedIn = true;
    }
  })


</script>

{#if entriesShown.shown}
  <div class="fixed inset-0 z-50 flex">
    <div
      class="flex-1 bg-black opacity-25"
      on:click={closeMenu}
    ></div>
    <div class="w-2/5 bg-white h-full relative shadow-lg flex flex-col">
      <button
        class="hover:cursor-pointer"
        on:click={closeMenu}
      >
        <img class="max-h-8 max-w-8" src={rightArrow} alt="Close" />
      </button>
      <div class="p-4 flex flex-col flex-1 overflow-y-auto">
        {#each feed as item }
          <Entry
            title={item.title}
            address={item.address}
            content={item.content} 
          />
        {/each}
      </div>
      
      <div class="border-t border-gray-200">
        <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
          About
        </button>
        {#if isLoggedIn}
          <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
            <a href="/create-entry"> Participate</a>
          </button>
        {/if}
        <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-semibold">
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  </div>
{/if}
