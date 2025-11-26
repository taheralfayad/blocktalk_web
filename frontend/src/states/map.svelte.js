import maplibregl from 'maplibre-gl';

let map;

export function initMap(container) {
  if (map) return map;

  map = new maplibregl.Map({
    container,
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [-81.3792, 28.5383],
    zoom: 10,
    attributionControl: false
  });

  return map;
}

export function getMap() {
  return map;
}
