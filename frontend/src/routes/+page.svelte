<script>
  import Header from '../components/header.svelte'
  import debounce from 'lodash/debounce';
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import {getDistance, getLocationSearchValue} from '../states/searchBarState.svelte.js';
  import {getFeed, setFeed} from '../states/feed.svelte.js';

  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-81.3792, 28.5383],
      zoom: 10,
      attributionControl: false
    });

    const handleMovement = debounce(() => {
      const bounds = map.getBounds();
      const north = bounds.getNorth();
      const east = bounds.getEast();
      const south = bounds.getSouth();
      const west = bounds.getWest();

      console.log("North:", north);
      console.log("East:", east);
      console.log("South:", south);
      console.log("West:", west);

      console.log(getDistance())
      console.log(getLocationSearchValue())

    }, 1500);

    map.on('zoomend', () => {
      handleMovement();
    });

    map.on('moveend', () => {
      handleMovement();
    });

  });

</script>

<div class="flex flex-col h-screen">
  <Header />
  <div id="map" class="flex-1 w-full"></div>
</div>
