import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2FzdHRoZWNhbG1pbmdhcHBsZSIsImEiOiJjbGZzZzFxNGcwNWpnM3RwanQ2bjlubGgzIn0.0WiHmOMaGvSo5Ms2TNd4Qw';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.09800754761238, 40.853489556812974],
      zoom: 12
      });
    map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('kitchens', {
      type: 'geojson',
      data: './features.geojson',
      cluster: true,
      clusterMaxZoom: 25, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'kitchens',
        filter: ['has', 'point_count'],
        paint: {
        'circle-color': '#bafc03',
        'circle-radius': 10,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff'
        }
        });
        
        
         
        map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'kitchens',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
        }
        });
         
        map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'kitchens',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
        }
        });
        
// inspect a cluster on click
map.on('click', 'clusters', (e) => {
  const features = 
    map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
  });
  const clusterId = 
    features[0].properties.cluster_id;
  map.getSource('kitchens').getClusterExpansionZoom(
    clusterId,
    (err, zoom) => {
      if (err) return;
   
      map.easeTo({
        center: 
          features[0].geometry.coordinates,
        zoom: zoom
      });
    }
  );
});

// When a click event occurs on a feature in
// the unclustered-point layer, open a popup at
// the location of the feature, with
// description HTML from its properties.
map.on('click', 'unclustered-point', (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const name = e.features[0].properties.name;
   
  // Ensure that if the map is zoomed out such that
  // multiple copies of the feature are visible, the
  // popup appears over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(
  `Name: ${name}`
  )
  .addTo(map);
  });

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
    });
  })
})

  return (
      <div className='map-container' ref={mapContainerRef} />
  );
};

export default Map;
