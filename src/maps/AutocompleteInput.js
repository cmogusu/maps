// @flow
import * as React from 'react';
import { forEach, map } from 'lodash';

type Props = {
  setPlace: Function,
};

class AutocompleteInput extends React.Component<Props> {
  static objectToArray(obj) {
    return map(obj, (booleanVal, key) => (
      booleanVal ? key : false
    )).filter(val => val);
  }

  state = {
    returnFields: {
      address_components: true,
      geometry: true,
      icon: true,
      name: true,
      place_id: false,
    },
    fetchTypes: {
      geocode: true,
      address: true,
      establishment: true,
      '(region)': true,
      '(cities)': true,
    },
    fetchType: 'geocode',
    strictBounds: false,
  };

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

  getReturnFields() {
    const { returnFields } = this.state;
    const finalFields = [];

    forEach(returnFields, (val, returnField) => {
      if (val) {
        finalFields.push(returnField);
      }
    });

    return finalFields;
  }

  init() {
    const { google } = window;

    this.google = google;
    this.renderAutocomplete();
    this.listen();
  }

  listen() {
    const { setPlace } = this.props;
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (!place.geometry) {
        console.log('no geometry in place result');
        return false;
      }

      setPlace(place);

      return true;
    });
  }

  showReturnTypeRadios() {
    const { fetchTypes, fetchType } = this.state;
    const func = (event) => {
      const { currentTarget } = event;
      const { id } = currentTarget;

      this.setState({
        fetchType: id,
      });
    };

    return fetchTypes.map((type) => {
      const isSelected = {
        selected: type === fetchType ? 'selected' : '',
      };

      return (
        <label key={type} htmlFor={type} style={{ marginLeft: '10px' }}>
          { type }
          <input id={type} type="radio" name="returnType" onChange={func} {...isSelected} />
        </label>
      );
    });
  }


  showReturnTypeCheckboxes() {
    const { returnFields, placeIdOnly } = this.state;
    const fields = map(returnFields, (val, index) => index);
    const func = (event) => {
      const { currentTarget } = event;
      const { name, checked } = currentTarget;

      const newReturnFields = Object.assign({}, returnFields, { [name]: checked });

      this.setState({
        returnFields: newReturnFields,
      });
    };

    return fields.map((returnField) => {
      const isChecked = {
        checked: returnFields[returnField] ? 'checked' : '',
      };

      const disabled = {
        disabled: placeIdOnly ? 'disabled' : '',
      };

      return (
        <label key={returnField} htmlFor={returnField} style={{ marginLeft: '10px' }}>
          { returnField }
          <input id={returnField} type="checkbox" name={returnField} onChange={func} {...isChecked} {...disabled} />
        </label>
      );
    });
  }


  showPlaceIdInput() {
    const field = 'placeIdOnly';
    const { placeIdOnly } = this.state;
    const isChecked = {
      checked: placeIdOnly ? 'checked' : '',
    };
    const func = (event) => {
      const { currentTarget } = event;
      const { checked } = currentTarget;

      this.setState({
        placeIdOnly: checked,
      });
    };

    return (
      <label key={field} htmlFor={field} style={{ marginLeft: '10px' }}>
        { field }
        <input id={field} type="checkbox" name={field} onChange={func} {...isChecked} />
      </label>
    );
  }


  renderAutocomplete() {
    const {
      placeIdOnly,
      fetchTypes,
      strictBounds,
      returnFields,
    } = this.state;
    const selectedFetchTypes = AutocompleteInput.objectToArray(fetchTypes);
    const selectedReturnFields = AutocompleteInput.objectToArray(returnFields);
    const options = placeIdOnly ? {
      placeIdOnly,
    } : {
      strictBounds,
      types: selectedFetchTypes,
    };

    const autocomplete = new this.google.maps.places.Autocomplete(this.element, options);
console.log(selectedFetchTypes, selectedReturnFields);
    autocomplete.setFields(selectedReturnFields);
    this.autocomplete = autocomplete;
  }


  render() {
    return (
      <div>
        <input ref={this.setElement} type="text" placeholder="write location" />
        <div>
          { this.showReturnTypeCheckboxes() }

          { this.showPlaceIdInput() }
        </div>
        <div>
          { this.showReturnTypeRadios() }
        </div>
      </div>
    );
  }
}

export default AutocompleteInput;
