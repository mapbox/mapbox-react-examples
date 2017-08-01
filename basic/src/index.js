'use strict';

import React from 'react'
import ReactDOM from 'react-dom'

class Application extends React.Component {
  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
