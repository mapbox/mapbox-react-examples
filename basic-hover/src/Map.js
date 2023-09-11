import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import data from './data.json';

mapboxgl.accessToken = 'your-api-key';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        data,
      });

      // Add layer on every country
      map.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        layout: {},
        paint: {
          'fill-color': '#fff',
          'fill-opacity': 0,
        },
      });

      // Add country borders
      map.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 2,
        },
      });

      // Add darken layer on hover over country
      map.addLayer({
        id: 'country-fills-hover',
        type: 'fill',
        source: 'countries',
        layout: {},
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.3,
        },
        filter: ['==', 'name', ''],
      });

      // Add mouse hover listener
      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['country-fills'],
        });

        if (features.length) {
          map.getCanvas().style.cursor = 'pointer';
          map.setFilter('country-fills-hover', [
            '==',
            'name',
            features[0].properties.name,
          ]);
        } else {
          map.setFilter('country-fills-hover', ['==', 'name', '']);
          map.getCanvas().style.cursor = '';
        }
      });

      // Add mouse un-hover listener
      map.on('mouseout', () => {
        map.getCanvas().style.cursor = 'auto';
        map.setFilter('country-fills-hover', ['==', 'name', '']);
      });

      // Add country onclick effect
      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['country-fills'],
        });
        if (!features.length) return;
        const {
          properties: { name, iso },
        } = features[0];
        alert(`You clicked on ${name} (${iso})!`);
      });
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
