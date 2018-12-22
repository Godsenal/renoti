import React, { Fragment } from 'react';

interface RadioProps {
  checked: string;
  items: string[];
  handleChange: (item: string) => void;
}
const Radio: React.FunctionComponent<RadioProps> = ({
  checked,
  items,
  handleChange,
}) => (
  <>
    {items.map((item, i) => (
      <div className="item" key={i}>
        <input
          type="radio"
          id={item}
          name={item}
          value={item}
          checked={checked === item}
          onChange={e => handleChange(item)}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    ))}
  </>
);

export default Radio;
