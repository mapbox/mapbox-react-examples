## React powered tooltip

Change the data displayed in a tooltip by passing the results of [`queryRenderedFeatures`](https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures) as props to a tooltip component.

![Demo gif](https://i.imgur.com/CoKbiP4.gif)

### Run it

    git clone https://github.com/mapbox/mapbox-react-examples.git

    cd mapbox-react-examples/react-tooltip
    npm install
    npm start

    open http://localhost:3000/

### Access token

    mapboxgl.accessToken = // YOUR_API_KEY_HERE

Replace the [API key](https://docs.mapbox.com/help/getting-started/access-tokens/) in `src/Map.js`.

Runs the app from http://localhost:3000
