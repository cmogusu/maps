import React from 'react';

class DynamicMaps extends React.Component {
  constructor(props) {
    super(props);

    this.element = {};
    window.initMap = this.init.bind(this);
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


  setElement(element: HTMLDivElement) {
    this.element = element;
  }


  addControl() {
    const controlDiv = document.createElement('div');

    controlDiv.id = 'my-control';
    controlDiv.style.padding = '5px';
    controlDiv.style.backgroundColor = '#fff';

    this.map.controls[this.google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);

    this.setControlDiv(controlDiv);
  }


  init() {
    const { google } = window;

    this.setGoogle(google);
    this.renderMap(this.element);
  }


  renderMap(domElement) {
    const { zoom } = this.state;
    const map = new this.google.maps.Map(domElement, {
      zoom,
      center: {
        lat: 40.7482,
        lng: -74.0348,
      },
    });

    this.setMap(map);
  }


  render() {
    return (
      <div>
        <h1>Dynamic Map</h1>
        <div ref={this.setElement} />
      </div>
    );
  }
}

export default DynamicMaps;
