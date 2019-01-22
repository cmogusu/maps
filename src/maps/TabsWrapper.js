import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DynamicMaps from '../maps/DynamicMaps.js';
// import { makeStyles } from '@material-ui/styles';
// import CostCheckbox from '../components/CostCheckbox.js';


type Props = {
  children: React.Node,
};

type State = {
  inputs: Array,
};


function TabContainer(props: Props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      { children }
    </Typography>
  );
}

/*
const useStyles = makeStyles(theme => ({
  root: {
    flowGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
*/

class CostEstimator extends React.Component<Props, State> {
  state = {
    value: 0,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event, newValue) {
    console.log(newValue);
    this.setState({
      value: newValue,
    });
  }

  render() {
    // const classes = useStyles();
    const { value } = this.state;

    return (
      <div className="">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Dynamic" />
            <Tab label="Time 2" />
            <Tab label="Time 3" />
          </Tabs>
        </AppBar>
        { value === 0 && <TabContainer><DynamicMaps /></TabContainer> }
        { value === 1 && <TabContainer>Time 2</TabContainer> }
        { value === 2 && <TabContainer>Time 3</TabContainer> }
      </div>
    );
  }
}

export default CostEstimator;
