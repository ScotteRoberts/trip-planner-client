import React from 'react';
import PropTypes from 'prop-types';

const Emoji = props => (
  <span role="img" aria-label={props.label} {...props}>
    {props.icon}
  </span>
);

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Emoji;
