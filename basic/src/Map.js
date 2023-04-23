import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import geoJson from "./features.geojson"

mapboxgl.accessToken =
'pk.eyJ1IjoiY2FzdHRoZWNhbG1pbmdhcHBsZSIsImEiOiJjbGZzZzFxNGcwNWpnM3RwanQ2bjlubGgzIn0.0WiHmOMaGvSo5Ms2TNd4Qw';


const Map = () => {
  const mapContainerRef = useRef(null);
  
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.09800754761238, 40.853489556812974],
      zoom: 12,
      maxZoom: 17.5
      });
    map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('kitchens', {
      type: 'geojson',
      data: geoJson,
      cluster: true,
      clusterMaxZoom: 19, // Max zoom to cluster points on
      clusterRadius: 15 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'kitchens',
        filter: ['has', 'point_count'], 
        paint: {
        'circle-color': '#bafc03',
        "circle-radius": [
          "interpolate", ["linear"], ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          8, 15,
          // zoom is 10 (or greater) -> circle radius will be 5px
          20, 10
      ],
        'circle-stroke-width': 3,
        'circle-stroke-color': '#000'
        }
        });
        
        
         
        map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'kitchens',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold']
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
        zoom: zoom * 1.25
      });
    }
  );
  const point_count = features[0].properties.point_count
  const coordinates = e.features[0].geometry.coordinates.slice()

  // Get all points under a cluster
  map.getSource('kitchens').getClusterLeaves(clusterId, point_count, 0, function (err, aFeatures) {
    let popupReal = "";
    let popupGhost = ""
    let childrenCount = Object.keys(aFeatures).length
    const isReal = aFeatures.filter(kitchen => kitchen.properties.is_real === '1')
    const isGhost = aFeatures.filter(kitchen => kitchen.properties.is_real === '0')
    const orderedArray = (isReal.length === 1 ? isReal.concat(isGhost) : [])
    orderedArray.map(kitchen => {
      console.log(kitchen.properties.is_real, kitchen.properties.name)
      if(kitchen.properties.is_real === '1'){
        popupReal += `
        <h3 class="real-kitchen" style="background-color:#91c949">${kitchen.properties.name}</h3>
        `
      }
      if(kitchen.properties.is_real === '0'){
        popupGhost += `
        <h3 class="ghost-kitchen" style="background-color:red">${kitchen.properties.name}</h3>
        `
      }
    })

    let popupGhostContainer = `
      <div class="ghost-container">
        <div class="ghost-kitchens">
          ${popupGhost}
        </div>
      </div>
      `
    let popupRealContainer = `
      <div class="real-container">
        <div class="real-kitchens">
          ${popupReal}
        </div>
      </div>
      `
    const popupHtml = `${popupRealContainer}${popupGhostContainer}`
    orderedArray.length > 1 && new mapboxgl.Popup({
                                closeButton: false,
                                maxWidth: "auto"
                              })
      .setLngLat(coordinates)
      .setHTML(popupHtml)
      .addTo(map);
  })
})

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
  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = '';
    });
  })
})

  return (
    <>
      <div id="map" className='map-container' ref={mapContainerRef}></div>  
    </>
  );
};

export default Map;
