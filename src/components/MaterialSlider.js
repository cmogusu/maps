import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    display: 'flex',
    height: 100,
    width: 20,
  },
  slider: {
    padding: '0px 22px',
  },
};

type Props = {
  classes?: string,
  setZoom: () => mixed,
  zoom: number,
};


type State = {
  value: number,
};


class VerticalSlider extends React.Component<Props, State> {
  static defaultProps = {
    classes: '',
  };

  static valueToZoom(value) {
    return Math.floor(value / 100 * 22);
  }


  static zoomToValue(zoom) {
    return Math.ceil(zoom * 100 / 22);
  }


  constructor(props) {
    super(props);

    const { zoom } = props;
    this.state = {
      value: VerticalSlider.zoomToValue(zoom),
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event, value) {
    const zoom = VerticalSlider.valueToZoom(value);
    const { setZoom } = this.props;

    setZoom(zoom);
    this.setState({ value });
  }


  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          onChange={this.handleChange}
          vertical
        />
      </div>
    );
  }
}

export default withStyles(styles)(VerticalSlider);
