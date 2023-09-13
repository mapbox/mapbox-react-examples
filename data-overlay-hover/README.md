## Data Overlay Hover example

Initialize a map with coordinates set by React, update the state of coordinates on map movement, and display that data in an element provided by the render function. Every country can be hovered and clicked.

![Demo gif](https://i.imgur.com/yZZ1nlI.gif)

### Run it

    git clone https://github.com/mapbox/mapbox-react-examples.git

    cd mapbox-react-examples/data-overlay-hover
    npm install
    npm start

    open http://localhost:3000/

### Access token

    mapboxgl.accessToken = // YOUR_API_KEY_HERE

Replace the [API key](https://docs.mapbox.com/help/getting-started/access-tokens/) in `src/Map.js`.

Runs the app from http://localhost:3000
