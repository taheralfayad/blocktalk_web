<script>
  let count = 0;
  let suggestionsHidden = true;
  let suggestions = ["apple", "orange", "banana"];
  let searchValue;

  function handleInput(event) {
    searchValue = event.target.value;
    
    suggestionsHidden = searchValue === "";

    console.log('User typed:', searchValue);
  }

  function handleClick() {
    count += 1;
    console.log("Button clicked! Count:", count);
  }

  import Search from '$lib/assets/search.svg';
</script>

<div class="relative inline-block w-64">
  <div class="border-2 border-black rounded-lg flex justify-start items-center p-2 w-full bg-white box-border">
    <button on:click={handleClick} class="hover:cursor-pointer">
      <img class="max-w-6 max-h-6" src={Search}/>
    </button>
    <input class="border-none focus:outline-none focus:ring-0 flex-1" on:input={handleInput} bind:value={searchValue} />
  </div>

  {#if !suggestionsHidden}
    <ul class="absolute left-0 mt-1 border-2 border-black bg-white w-full rounded-lg shadow box-border">
      {#each suggestions as suggestion}
        <li class="px-2 py-1 hover:bg-gray-100 cursor-pointer">{suggestion}</li>
      {/each}
    </ul>
  {/if}
</div>
