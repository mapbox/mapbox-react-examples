import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import data from "./data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const options = [
  {
    name: "Population",
    description: "Estimated total population",
    property: "pop_est",
    stops: [
      [0, "#f8d5cc"],
      [1000000, "#f4bfb6"],
      [5000000, "#f1a8a5"],
      [10000000, "#ee8f9a"],
      [50000000, "#ec739b"],
      [100000000, "#dd5ca8"],
      [250000000, "#c44cc0"],
      [500000000, "#9f43d7"],
      [1000000000, "#6e40e6"],
    ],
  },
  {
    name: "GDP",
    description: "Estimate total GDP in millions of dollars",
    property: "gdp_md_est",
    stops: [
      [0, "#f8d5cc"],
      [1000, "#f4bfb6"],
      [5000, "#f1a8a5"],
      [10000, "#ee8f9a"],
      [50000, "#ec739b"],
      [100000, "#dd5ca8"],
      [250000, "#c44cc0"],
      [5000000, "#9f43d7"],
      [10000000, "#6e40e6"],
    ],
  },
];

const Map = () => {
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [property, setProperty] = useState(options[0].property);
  const [stops, setStops] = useState(options[0].stops);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5, 34],
      zoom: 1.5,
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data,
      });

      map.addLayer({
        id: "countries",
        type: "fill",
        source: "countries",
      });

      map.setPaintProperty("countries", "fill-color", {
        property,
        stops,
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeState = (i) => {
    setActive(options[i]);
    setProperty(options[i].property);
    setStops(options[i].stops);

    map.setPaintProperty("countries", "fill-color", {
      property,
      stops,
    });
  };

  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => changeState(i)}
          checked={option.property === property}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };

  const renderLegendKeys = (stop, i) => {
    return (
      <div key={i} className="txt-s">
        <span
          className="mr6 round-full w12 h12 inline-block align-middle"
          style={{ backgroundColor: stop[1] }}
        />
        <span>{`${stop[0].toLocaleString()}`}</span>
      </div>
    );
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
        {options.map(renderOptions)}
      </div>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
        <div className="mb6">
          <h2 className="txt-bold txt-s block">{active.name}</h2>
          <p className="txt-s color-gray">{active.description}</p>
        </div>
        {active.stops.map(renderLegendKeys)}
      </div>
    </div>
  );
};

export default Map;
