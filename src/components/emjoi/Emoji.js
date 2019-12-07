import React from 'react';

const Emoji = props => (
  <span role="img" aria-label={props.label} {...props}>
    {props.children}
  </span>
);

export default Emoji;
