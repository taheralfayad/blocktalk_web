<script>
    import Banner from '../design-system/banner.svelte';
    import SearchBar from '../design-system/searchBar.svelte';
    import Entries from '../components/entries.svelte';

    import Logo from '$lib/assets/transparent-logo.svg';

    let entries = $state({'shown': false});
</script>

<div class="shadow-sm flex justify-between p-2 items-center min-h-16">
  <div class="flex items-center justify-center max-h-6 w-28">
    <img class="max-w-28" src={Logo} alt="Logo" />
  </div>

  <SearchBar/>

  <button
    onclick={() => entries.shown = true}
    class="
      hover:cursor-pointer
      flex items-center gap-2
      px-6 py-2
      rounded-md
      bg-slate-300
      text-black-200
      font-medium
      hover:bg-slate-400
      transition
      focus:ring-2
      focus:ring-cyan-300
    "
  >
    <span>Feed</span>
  </button>

  {#if entries.shown}
    <Entries entriesShown={entries}/>
  {/if}
</div>
