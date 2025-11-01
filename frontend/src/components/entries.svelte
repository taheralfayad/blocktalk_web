<script>
  import rightArrow from '$lib/assets/right.svg';
  export let entriesShown = { shown: false };
  const closeMenu = () => {
    entriesShown.shown = false;
  };
</script>

{#if entriesShown.shown}
  <div class="fixed inset-0 z-50 flex">
    <div
      class="flex-1 bg-black opacity-25"
      on:click={closeMenu}
    ></div>
    <div class="w-2/5 bg-white h-full relative shadow-lg flex flex-col">
      <button
        class="absolute top-2 right-2 hover:cursor-pointer"
        on:click={closeMenu}
      >
        <img class="max-h-8 max-w-8" src={rightArrow} alt="Close" />
      </button>
      <div class="p-4 flex flex-col flex-1 overflow-y-auto">
        <h2 class="text-xl font-semibold">Feed</h2>
        <h1> something </h1>
        <h1> something </h1>
        <h1> something </h1>
        <h1> something </h1>
      </div>
      
      <div class="border-t border-gray-200">
        <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
          About
        </button>
        <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
          Participate
        </button>
        <button class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-semibold">
          Login
        </button>
      </div>
    </div>
  </div>
{/if}
