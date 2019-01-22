import React from 'react';
import ReactDOM from 'react-dom';
import CostEstimator from './maps/CostEstimator.js';
// import PlotPointsOnMap from './maps/PlotPointsOnMap.js';


const App = () => (
  <div>
    <CostEstimator />
  </div>
);


ReactDOM.render(<App />, document.getElementById('root'));
