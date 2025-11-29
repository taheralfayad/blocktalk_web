<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Header from '../components/header.svelte';
  import debounce from 'lodash/debounce';
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import {getDistance, getLocationSearchValue} from '../states/searchBarState.svelte.js';
  import {getFeed, setFeed} from '../states/feed.svelte.js';
  import { initMap, getMap } from '../states/map.svelte.js';

  let map;

  let refreshToken = async () => {
    const data = {
      'refresh_token': localStorage.getItem('refresh_token')
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = fetch(
      `${PUBLIC_BACKEND_URL}/refresh-token`, options
    ).then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    }).then(data => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expires_at", data.expires_at);
    });
  }

  onMount(() => {
    refreshToken();
    initMap('map');

    let map = getMap();

    const handleMovement = debounce(() => {
      const bounds = map.getBounds();
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

    handleMovement();

  });

</script>

<div class="flex flex-col h-screen">
  <Header />
  <div id="map" class="flex-1 w-full"></div>
</div>
