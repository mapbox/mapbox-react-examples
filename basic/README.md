Basic example using React Hooks
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Initialize a map with coordinates set by React, update the state of coordinates on map movement, and display that data in an element provided by the render function.

![Demo gif](https://i.imgur.com/IGJuTuM.gif)

### Run it

    git clone https://github.com/mapbox/mapbox-react-examples.git

    cd mapbox-react-examples/v2_basic
    npm install
    npm start

    open http://localhost:3000/

Runs the app from http://localhost:3000

For more information see [Use Mapbox GL JS in a React app](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) 


Documentation
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Initialize a map with coordinates set by React, update the state of coordinates on map movement, and display that data in an element provided by the render function.

![Demo gif](https://i.imgur.com/IGJuTuM.gif)

### Run it

    git clone https://github.com/mapbox/mapbox-react-examples.git

    cd mapbox-react-examples/basic-with-hooks
    npm install
    npm start

    open http://localhost:3000/

Runs the app from http://localhost:3000




### File Structure

#### The HTML page

Open the `index.html` file in the folder `basic-with-hooks`. This file was created by [Create React App](https://github.com/facebook/create-react-app). The line has been added for our example:

__index.html__

```
...
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />
...
```

This code creates the structure of the HTML page your users will see.

#### Create the React app

##### index.js

Open the `index.js` file in the folder `basic-with-hooks/src`. This file was created by [Create React App](https://github.com/facebook/create-react-app).

index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
```

##### App.js

Open the `App.js` file in the folder `basic-with-hooks/src`. This file was created by [Create React App](https://github.com/facebook/create-react-app), but we changed it.

__app.js__

```
import React from "react";
import Map from "./Map";
function App() {
  return (
    <div>
      <Map />
    </div>
  );
}
export default App;
```

##### Map.js

Open the `Map.js` file in the folder `basic-with-hooks/src`. We created this file for this tutorial. So we have a clean project structure. The card is a separate component.

__Map.js__

```
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";
const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(7.2);
  const [lat, setLat] = useState(50.3);
  const [zoom, setZoom] = useState(12.5);
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("moveend", () => {
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
```

__Step by Step__

1. We are the first to import everything that is necessary.

```
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
...
```

2. Next, set `mapboxgl`'s [`accessToken` property](https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken) to the value of your Mapbox access token. Replace the `MAPBOX_ACCESS_TOKEN` placeholder with your Mapbox access token:

```
...
mapboxgl.accessToken = "MAPBOX_ACCESS_TOKEN";
...
```

3. Then we create the function component `Map` and export it.

```
...
const Map = () => {
...
};
export default Map;
```

4. Next, we will create some defaults for the app to use for the initial latitude, longitude, and zoom of the map.

`useRef` returns a ref object whose `.current` property is initialized to the passed argument. Read more about the [`useRef` Hook](https://reactjs.org/docs/hooks-reference.html#useref).

`useState` stores the original longitude, latitude, and zoom for the map. These values will all change as your user interacts with the map. In a function component, we have no `this`. Instead, we call the [`useState` Hook](https://reactjs.org/docs/hooks-state.html) directly inside our component.

```
...
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(7.2);
  const [lat, setLat] = useState(50.3);
  const [zoom, setZoom] = useState(12.5);
...
```
5. Then we look at how we treat changes in the map --- side effects. [useEffect](https://reactjs.org/docs/hooks-effect.html) lets you perform side effects in function components. These are all the operations that affect your component and can’t be done during rendering. Changing the maps longitude, latitude, or zoom is a change of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) and this is an example of a side effect.

```
...
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("moveend", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []);
...
```

6. Now that you are able to collect and store this information, you can use `return` to display it on the map. Inside the opening tag of the `<div>` you created to hold the map, add a new `<div>` that will be used to display the longitude, latitude, and zoom of the map:

```
...
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
...
```

##### Map.css

The map needs a few styling rules to render correctly. Open the `Map.css` file in the folder `basic-with-hooks/src`. We created this file for this tutorial:

__Map.css__

```
.map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.sidebarStyle {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
  background-color: #404040;
  color: #ffffff;
  z-index: 1 !important;
  padding: 6px;
  font-weight: bold;
}
```

That is it!