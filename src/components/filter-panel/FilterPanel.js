import React from 'react';
import PropTypes from 'prop-types';
import './FilterPanel.css';

const FilterPanel = props => (
  <aside className="filter-panel">{props.children}</aside>
);

FilterPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FilterPanel;
