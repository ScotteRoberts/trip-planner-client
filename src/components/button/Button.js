import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => (
  <button className={`button ${props.className}`} {...props}>
    {props.children}
  </button>
);

Button.propTypes = {};

export default Button;
