import React from 'react';
import PropTypes from 'prop-types';

const TripFormTextInput = props => (
  <label className="input-container" htmlFor={props.id}>
    {`${props.placeholder}:`}
    <input
      type="text"
      name={props.id}
      id={props.id}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onInputChange}
      onBlur={props.onBlur(props.id)}
      className={props.className}
    />
  </label>
);

TripFormTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default TripFormTextInput;
