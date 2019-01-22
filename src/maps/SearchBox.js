// @flow
import * as React from 'react';


type Props = {
  setPlace: Function,
};

class AutocompleteInput extends React.Component<Props> {
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


  setElement(element: HTMLDivElement) {
    this.element = element;
  }


  init() {
    const { google } = window;

    this.google = google;
    this.renderSearchBox();
    this.listen();
  }

  listen() {
    const { setPlace } = this.props;
    this.autocomplete.addListener('places_changed', () => {
      const places = this.autocomplete.getPlaces();

      if (!places.length === 0) {
        console.log('no geometry in place result');
        return false;
      }

      setPlace(places);

      return true;
    });
  }

  renderSearchBox() {
    this.searchBox = new this.google.maps.places.SearchBox(this.element);
  }


  render() {
    return (
      <div>
        <input ref={this.setElement} type="text" placeholder="Searchbox" />
      </div>
    );
  }
}

export default AutocompleteInput;
