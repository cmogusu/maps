import React from 'react';
// import Map from './Map.js';
import AutocompleteInput from './AutocompleteInput.js';
import { createMapsReadyEvent } from '../business/functions.js';

class DirectionsMap extends React.Component {
  constructor(props) {
    super(props);

    createMapsReadyEvent();
    this.setPlace = this.setPlace.bind(this);
  }


  setPlace(place) {
    console.log('new place set', place);
  }


  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <AutocompleteInput setPlace={this.setPlace} />
      </div>
    );
  }
}


export default DirectionsMap;
