import { getMap } from './map.svelte.js';
import maplibregl from 'maplibre-gl';

let feed = $state([]);
let activeMarkers = [];

export function getFeed() {
	return feed;
}

export function setFeed(newFeed) {
	feed = newFeed;
	const map = getMap();

	activeMarkers.forEach((marker) => {
		marker.remove();
	});
	activeMarkers = [];

	newFeed.forEach((element) => {
		const marker = new maplibregl.Marker()
			.setLngLat([element.longitude, element.latitude])
			.addTo(map);
		activeMarkers.push(marker);
	});

	console.log(activeMarkers);
}
