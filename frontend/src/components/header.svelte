<script>
    import Banner from '../design-system/banner.svelte';
    import SearchBar from '../design-system/searchBar.svelte';
    import Entries from '../components/entries.svelte';

    let entries = $state({'shown': false});
</script>

<div class="shadow-sm flex justify-between p-2 items-center">
  <Banner text={"BlockTalk"}/>
  <SearchBar/>
  <button onclick={() => entries.shown = true} class="hover:cursor-pointer">
    <Banner text={"Feed"}/>
  </button>
  {#if entries.shown === true}
    <Entries entriesShown={entries}/>
  {/if}
</div>
