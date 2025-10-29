<script>
  import Header from '../components/header.svelte'
  import debounce from 'lodash/debounce';
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';

  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-0.1276, 51.5072],
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
