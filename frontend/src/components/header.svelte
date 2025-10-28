<script>
    import Banner from '../design-system/banner.svelte'
    import SearchBar from '../design-system/searchBar.svelte'
</script>

<div class="shadow-sm flex justify-between p-2 items-center">
  <Banner text={"BlockTalk"}/>
  <SearchBar/>
  <button class="hover:cursor-pointer">
    <Banner text={"Entries"}/>
  </button>
</div>
