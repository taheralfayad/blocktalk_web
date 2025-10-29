<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';

  let suggestionsHidden = true;
  let suggestions = [];
  let searchValue = '';

  let distance = '';

  let distances = {
    '10mi': 10,
    '15mi': 15,
    '20mi': 20,
    '25mi': 25
  }

  async function handleInput(event) {
    searchValue = event.target.value;

    if (searchValue.length > 3) {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/retrieve-city?city=${searchValue}`);

      const data = await response.json();

      suggestions = data;

      suggestionsHidden = suggestions.length === 0;


    }
    
  }

  function selectCity(suggestion) {
    searchValue = suggestion;
    suggestionsHidden = true;
    suggestions = [];
  }

</script>

<div class="relative inline-block">
  <div class="border-2 border-black rounded-lg flex justify-start items-center p-2 w-full bg-white box-border">
    <select
    >
      {#each Object.entries(distances) as [label, value]}
        <option value={value}>{label}</option>
      {/each}
    </select>
    <input class="border-none focus:outline-none focus:ring-0 flex-1 w-9/10" on:input={handleInput} bind:value={searchValue} />
  </div>

  {#if !suggestionsHidden}
    <ul class="absolute left-0 mt-1 border-2 border-black bg-white w-full rounded-lg shadow box-border z-50">
      {#each suggestions as suggestion}
        <li
          class="px-2 py-1 hover:bg-gray-100 cursor-pointer"
          on:click={() => selectCity(suggestion)}
        >
          {suggestion}
        </li>
      {/each}
    </ul>
  {/if}
</div>
