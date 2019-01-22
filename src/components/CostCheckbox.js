import * as React from 'react';


type Props = {
  title: string,
  name: string,
  cost: number,
};

const CostCheckbox = (props: Props) => {
  const { title, name, cost } = props;

  return (
    <div>
      <label htmlFor={name}>
        { title }
        <input id={`input-${name}`} type="checkbox" name={name} />
        { cost }
      </label>
    </div>
  );
};


export default CostCheckbox;
