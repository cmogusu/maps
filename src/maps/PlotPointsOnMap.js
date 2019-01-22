import * as React from 'react';
import { debounce } from 'lodash';

import Portal from '../components/Portal.js';
import MaterialSlider from '../components/MaterialSlider.js';
import { mapStyle1 } from '../data/mapStyles.js';
import { createInfoWindow } from '../business/functions.js';


class PlotPointsOnMap extends React.Component<{}> {
  constructor(props) {
    super(props);

    window.initMap = this.init.bind(this);
    this.setZoom = this.setZoom.bind(this);
    this.setZoom = debounce(this.setZoom, 500);
    this.controlDiv = document.getElementById('orange');

    this.state = {
      zoom: 15,
      controlDivLoaded: false,
    };
  }


  componentDidMount() {
    if (window.google) {
      this.init();
    }
  }


  setGoogle(google) {
    this.google = google;
  }


  setMap(map) {
    this.map = map;
  }


  setControlDiv(controlDiv) {
    this.controlDiv = controlDiv;
  }


  setZoom(zoom) {
    if (this.map) {
      this.map.setZoom(zoom);
    }

    this.setState({ zoom });
  }


  addGeoJson(file) {
    this.map.data.loadGeoJson(file);
  }


  addControl() {
    const controlDiv = document.createElement('div');

    controlDiv.id = 'my-control';
    controlDiv.style.padding = '5px';
    controlDiv.style.backgroundColor = '#fff';

    this.map.controls[this.google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);

    this.setControlDiv(controlDiv);
    this.setState({
      controlDivLoaded: true,
    });
  }


  init() {
    const { google } = window;

    this.setGoogle(google);
    this.renderMap(document.getElementById('map'));
    this.addGeoJson(`${process.env.PUBLIC_URL}/json/newyorkGeoJsonData.json`);

    this.tieClickEvents();
    this.tieZoomEvents();
    this.addControl();
  }


  tieClickEvents() {
    this.map.data.addListener('click', (event) => {
      const category = event.feature.getProperty('category');
      const name = event.feature.getProperty('name');
      const position = event.feature.getGeometry().get();
      const html = `name: ${name}, category:  ${category}`;

      const infoWindow = createInfoWindow(this.google, html);

      infoWindow.setPosition(position);
      infoWindow.open(this.map);
    });
  }


  tieZoomEvents() {
    this.map.addListener('zoom_changed', () => {
      this.setState({
        zoom: this.map.getZoom(),
      });
    });
  }


  renderMap(domElement) {
    const { zoom } = this.state;
    const map = new this.google.maps.Map(domElement, {
      zoom,
      center: {
        lat: 40.7482,
        lng: -74.0348,
      },
      styles: mapStyle1,
    });

    this.setMap(map);
  }


  render() {
    const { zoom, controlDivLoaded } = this.state;

    return (
      <div>
        Does this work?
        { controlDivLoaded ? (
          <Portal element={this.controlDiv}>
            <MaterialSlider setZoom={this.setZoom} zoom={zoom} />
            <div>
              Zoom:
              {zoom}
            </div>
          </Portal>
        ) : '' }
      </div>
    );
  }
}


export default PlotPointsOnMap;
