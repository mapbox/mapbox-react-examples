import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './components/Legend';
import Optionsfield from './components/Optionsfield';
import './Map.css';
import { setActiveOption } from './redux/action-creators';
import { connect } from 'react-redux';

const ConnectedLegend = connect(mapStateToPropsLegend)(Legend);
const ConnectedOptionsfield = connect(mapStateToPropsOptionsfield)(
  Optionsfield
);

function mapStateToPropsLegend(state) {
  return {
    active: state.active
  };
}

function mapStateToPropsOptionsfield(state) {
  return {
    options: state.options,
    active: state.active
  };
}

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = props => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [5, 34],
      zoom: 1.5
    });

    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        data: props.data
      });

      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
          ]
        }
      ]);

      map.addLayer(
        {
          id: 'countries',
          type: 'fill',
          source: 'countries'
        },
        'country-label'
      );

      map.setPaintProperty('countries', 'fill-color', {
        property: props.active.property,
        stops: props.active.stops
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [props.active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty('countries', 'fill-color', {
        property: props.active.property,
        stops: props.active.stops
      });
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
      <ConnectedLegend />
      <ConnectedOptionsfield changeState={setActiveOption} />
    </div>
  );
};

export default Map;
