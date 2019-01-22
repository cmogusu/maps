// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';


type Props = {
  element: HTMLElement,
  children?: React.Node,
};

class Portal extends React.Component<Props> {
  static defaultProps = {
    children: <div>Add children</div>,
  };

  static count(a: number, b:number): number {
    return a + b;
  }

  render():React.Node {
    const { element, children } = this.props;

    if (!element) {
      return '';
    }

    return ReactDOM.createPortal(children, element);
  }
}

export default Portal;
