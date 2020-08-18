import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./components/Legend";
import Optionsfield from "./components/Optionsfield";
import "./Map.css";
import data from "./data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = () => {
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
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
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

      map.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      const stops = active.stops;
      const property = active.property;

      map.setPaintProperty("countries", "fill-color", {
        property,
        stops,
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = (i) => {
    setActive(options[i]);
    map.setPaintProperty("countries", "fill-color", {
      property: active.property,
      stops: active.stops,
    });
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
    </div>
  );
};

export default Map;
