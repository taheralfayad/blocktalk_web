<script>
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Header from '../components/header.svelte';
	import debounce from 'lodash/debounce';
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getDistance, getLocationSearchValue } from '../states/searchBarState.svelte.js';
	import { getFeed, setFeed } from '../states/feed.svelte.js';
	import { initMap, getMap } from '../states/map.svelte.js';

	import { api } from '../utils/api.svelte.js';

	let refreshToken = async () => {
		try {
			await api.post('/users/refresh-token');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
		} catch (err) {
			console.error('Error refreshing token:', err);
		}
	};

	let retrieveEntries = async (data) => {
		const response = await api.post('/entries/retrieve-entries-within-visible-bounds', data);

		setFeed(response);
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
			};

			retrieveEntries(data);
		}, 1500);

		mapInstance.on('click', (e) => {
			const { lng, lat } = e.lngLat;

			let token = localStorage.getItem('access_token');

			if (token === null) {
				console.log('sorry bucko, not allowed');
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
				console.log('hello?');
				handleMovement();
			});

			handleMovement();
		});

		onDestroy(() => {
			destroyMap();
		});
	});
</script>

<div class="flex h-screen flex-col">
	<Header />
	<div id="map" class="relative min-h-0 min-w-0 flex-1"></div>
</div>
