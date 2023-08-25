import React from 'react';
import Map from './Map';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Map />
      </div>
    </Provider>
  );
}

export default App;
