<script>
  let {
    suggestionsHidden,
    suggestions,
    handleInput,
    selectCity,
    searchValue = $bindable()
  } = $props();
</script>

<div class="relative inline-block">
  <div class="border-2 border-black rounded-lg flex justify-start items-center p-2 w-full bg-white box-border">
    <input class="border-none focus:outline-none focus:ring-0 flex-1 w-9/10" oninput={handleInput} bind:value={searchValue} />
  </div>

  {#if !suggestionsHidden}
  <ul class="absolute left-0 mt-1 border-2 border-black bg-white w-full rounded-lg shadow box-border z-50">
    {#each suggestions as suggestion}
      <li
        class="px-2 py-1 hover:bg-gray-100 cursor-pointer"
        onclick={() => selectCity(suggestion)}
      >
        {suggestion}
      </li>
    {/each}
  </ul>
  {/if}
</div>
