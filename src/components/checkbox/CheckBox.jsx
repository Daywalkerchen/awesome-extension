import React, { useState } from 'react';
import './checkbox.scss';

/**
 * @param {{
 *  id: string,
 *  label: string,
 *  value: boolean,
 *  onChange: (newValue: boolean) => void
 * }} props
 * @returns
 */
const CheckBox = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.checked);
  };

  return (
    <div className="checkbox">
      <input id={props.id} className="checkbox" type="checkbox" checked={props.value} onChange={handleChange} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default CheckBox;
