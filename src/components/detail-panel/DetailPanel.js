import React from 'react';
import PropTypes from 'prop-types';
import './DetailPanel.css';

const DetailPanel = props => (
  <aside className={`detail-panel${props.isActive ? ' active' : ''}`}>
    {props.children}
  </aside>
);

DetailPanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DetailPanel;
