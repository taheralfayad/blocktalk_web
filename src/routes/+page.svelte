<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Header from '../components/header.svelte';
  import debounce from 'lodash/debounce';
  import { onMount, onDestroy } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import {getDistance, getLocationSearchValue} from '../states/searchBarState.svelte.js';
  import {getFeed, setFeed} from '../states/feed.svelte.js';
  import { initMap, getMap } from '../states/map.svelte.js';

  let refreshToken = async () => {
    const data = {
      refresh_token: localStorage.getItem("refresh_token"),
    };

    try {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_at");

        console.warn("Refresh token expired. User logged out.");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("expires_at", result.expires_at);
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  onMount(() => {
    refreshToken();
    initMap('map');

    const mapInstance = getMap();

    const handleMovement = debounce(() => {
      const bounds = mapInstance.getBounds();
      const north = bounds.getNorth();
      const east = bounds.getEast();
      const south = bounds.getSouth();
      const west = bounds.getWest();

      const data = {
        north: north,
        south: south,
        east: east,
        west: west
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      const response = fetch(
        `${PUBLIC_BACKEND_URL}/retrieve-entries-within-visible-bounds`,
        options
      ).then(response => {
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        if (response.status === 204){
          return []
        }

        return response.json()
      }).then(data => {
        setFeed(data);
      })
    }, 1500);


  mapInstance.on('click', (e) => {
    const { lng, lat } = e.lngLat;

    let token = localStorage.getItem("access_token");

    if (token === null) {
        console.log("sorry bucko, not allowed");
        return;
    }

    console.log('Clicked at:', lng, lat);
  });

  mapInstance.on('load', () => {
    mapInstance.resize();

    mapInstance.on('zoomend', () => {
      handleMovement();
    });
    mapInstance.on('moveend', () => {
      console.log("hello?")
      handleMovement();
    });

    handleMovement(); 
  });

  onDestroy(() => {
    destroyMap();
  });

  });

</script>

<div class="flex flex-col h-screen">
  <Header />
  <div id="map" class="flex-1 min-h-0 min-w-0 relative"></div>
</div>
