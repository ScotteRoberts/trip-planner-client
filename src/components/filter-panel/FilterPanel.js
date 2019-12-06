import React from 'react';
import PropTypes from 'prop-types';
import './FilterPanel.css';

const FilterPanel = props => (
  <aside className="filter-panel">{props.children}</aside>
);

export default FilterPanel;
