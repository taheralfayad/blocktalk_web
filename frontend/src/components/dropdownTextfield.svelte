<script>
  import Input from '../components/input.svelte';
  let {
    suggestionsHidden,
    suggestions,
    handleInput,
    selectSuggestion,
    searchValue = $bindable()
  } = $props();
</script>

<div class="relative inline-block">
  <div class="rounded-lg flex justify-start items-center p-2 w-full bg-white box-border">
    <Input
      bind:value={searchValue}
      id="searchBar"
      required
      aria-required="true"
      placeholder="Find a City"
      handleInput={handleInput}
    />
  </div>

  {#if !suggestionsHidden}
  <ul class="absolute left-0 mt-1 border-2 border-black bg-white w-full rounded-lg shadow box-border z-50">
    {#each suggestions as suggestion}
      <li
        class="px-2 py-1 hover:bg-gray-100 cursor-pointer"
        onclick={() => selectSuggestion(suggestion)}
      >
        {suggestion}
      </li>
    {/each}
  </ul>
  {/if}
</div>
