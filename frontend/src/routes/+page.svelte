<script>
  import Header from '../components/header.svelte'
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';

  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-0.1276, 51.5072], // London
      zoom: 10
    });
  });

</script>

<Header/>

<div id="map" style="height: 100vh; width: 100%;"></div>
