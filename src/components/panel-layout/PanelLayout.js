import React from 'react';
import PropTypes from 'prop-types';
import './PanelLayout.css';

const PanelLayout = props => (
  <aside className={`panel-layout${props.isActive ? '--active' : ''}`}>
    {props.children}
  </aside>
);

PanelLayout.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PanelLayout;
