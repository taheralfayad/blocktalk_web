<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import {getDistance, getLocationSearchValue, setDistance, setLocationSearchValue} from '../states/searchBarState.svelte.js';

  let suggestions = $state([]);
  let distanceValue = $state(getDistance());
  let searchValue = $state(getLocationSearchValue());
  const suggestionsHidden = $derived(suggestions.length === 0);

  const distances = {
    '10mi': 10,
    '15mi': 15,
    '20mi': 20,
    '25mi': 25
  };

  $effect(() => {
    setDistance(distanceValue);
    setLocationSearchValue(searchValue);
  });

  async function handleInput(event) {
    setLocationSearchValue(event.target.value);

    if (searchValue.length > 3) {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/retrieve-city?city=${getLocationSearchValue()}`);
      const data = await response.json();
      suggestions = data;
    } else {
      suggestions = [];
    }
  }

  function selectCity(suggestion) {
    setLocationSearchValue(suggestion)
    searchValue = suggestion
    suggestions = [];
  }

</script>

<div class="relative inline-block">
  <div class="border-2 border-black rounded-lg flex justify-start items-center p-2 w-full bg-white box-border">
    <select
      bind:value={distanceValue}
    >
      {#each Object.entries(distances) as [label, value]}
        <option value={value}>{label}</option>
      {/each}
    </select>
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
