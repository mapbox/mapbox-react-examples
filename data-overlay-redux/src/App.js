import React from 'react';
import Map from './Map';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';

const ConnectedMap = connect(mapStateToProps)(Map);

function mapStateToProps(state) {
  return {
    data: state.data,
    active: state.active
  };
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <ConnectedMap />
      </div>
    </Provider>
  );
}

export default App;
