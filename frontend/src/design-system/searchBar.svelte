<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import { getDistance, getLocationSearchValue, setDistance, setLocationSearchValue} from '../states/searchBarState.svelte.js';
  import { getMap } from '../states/map.svelte.js';
  import DropdownTextfield from '../components/dropdownTextfield.svelte';

  let suggestions = $state([]);
  let distanceValue = $state(getDistance());
  let searchValue = $state(getLocationSearchValue());
  const suggestionsHidden = $derived(suggestions.length === 0);

  $effect(() => {
    setDistance(distanceValue);
    setLocationSearchValue(searchValue);
  });

  async function retrieveFeed() {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/feed?location=${getLocationSearchValue()}&distance=${getDistance()}`);


      if (response.ok && response.status !== 204) {
        const data = await response.json();
        
        console.log(data)
      }
  }

  async function handleInput(event) {
    setLocationSearchValue(event.target.value);

    if (searchValue.length > 3) {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/retrieve-city?city=${getLocationSearchValue()}`);
      const data = await response.json();
      console.log(data)
      suggestions = data;
    } else {
      suggestions = [];
    }
  }

  async function selectCity(suggestionName) {
    const suggestionObject = suggestions.find(
      suggestion => suggestion.city === suggestionName
    );
    console.log(suggestionObject)
    let map = getMap();
    map.flyTo({
      center: [suggestionObject.lng, suggestionObject.lat],
      zoom: 10,
      speed: 3.0,
      curve: 1.42
    });
    setLocationSearchValue(suggestionName);
    searchValue = suggestionName;
    await retrieveFeed();
    suggestions = [];
  }

</script>

<DropdownTextfield
  suggestionsHidden={suggestionsHidden}
  suggestions={suggestions.map(suggestion => suggestion.city)}
  handleInput={handleInput}
  selectSuggestion={selectCity}
  bind:searchValue={searchValue}
/>

