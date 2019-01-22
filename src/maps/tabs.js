import * as React from 'react';

import CostCheckbox from '../components/CostCheckbox.js'


type Props = {};
type State = {
  inputs: Array,
};


class CostEstimator extends React.Component<Props, State> {
  state = {
    inputs: [{
      title: 'title 1',
      name: 'name 1',
      cost: 0.04,
    }, {
      title: 'title 2',
      name: 'name 2',
      cost: 0.04,
    }, {
      title: 'title 3',
      name: 'name 3',
      cost: 0.04,
    }, {
      title: 'title 4',
      name: 'name 4',
      cost: 0.04,
    }],
  }


  render() {
    const { inputs } = this.state;
    return (
      <div>
        Please select info to fetch
        { inputs.map(input => (
          <CostCheckbox title={input.title} name={input.name} cost={input.cost} />
        ))}
      </div>
    );
  }
}

export default CostEstimator;
