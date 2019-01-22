import React from 'react';


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.element = {};
    this.setElement = this.setElement.bind(this);
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    if (window.google) {
      this.init();
    } else {
      window.addEventListener('mapsReady', this.init);
    }
  }


  componentWillUnmount() {
    window.removeEventListener('mapsReady', this.init);
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


  init() {
    const { google } = window;

    this.setGoogle(google);
    this.renderMap();
  }


  renderMap() {
    const zoom = 15;
    const map = new this.google.maps.Map(this.element, {
      zoom,
      center: {
        lat: 40.7482,
        lng: -74.0348,
      },
    });

    this.setMap(map);
  }


  render() {
    return <div ref={this.setElement} style={{ height: '400px', backgroundColor: '#eee' }} />;
  }
}

export default Map;
