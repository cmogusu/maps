import React from 'react';
import ReactDOM from 'react-dom';
import DirectionsMap from './maps/DirectionsMap.js';


const App = () => (
  <div>
    <DirectionsMap />
  </div>
);


ReactDOM.render(<App />, document.getElementById('root'));
