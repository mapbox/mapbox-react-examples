import React from 'react';
import Map from './Map';

function App() {
  return (
    <>
    <div className='sidebar'>
      <div className='heading'>
        <h1>Our locations</h1>
      </div>
      <div id='listings' className='listings'></div>
    </div>
  <Map />
  </>
  );
}

export default App;
