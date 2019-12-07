import React from 'react';
import PropTypes from 'prop-types';
import './TripFilters.css';
import SearchBar from '../search-bar';
import CategoryDropdown from '../category-dropdown';

const TripFilters = props => {
  const handleFilterChange = (property, value) => {
    const newOptions = { ...props.filterOptions, [property]: value };
    props.setFilterOptions(newOptions);
  };

  const handleSearch = searchText => {
    handleFilterChange('searchText', searchText);
  };

  const handleCategoryChange = category => {
    handleFilterChange('category', category);
  };

  return (
    <div className="trip-filters">
      <h2>Filters</h2>
      <SearchBar onSearch={handleSearch} />
      <CategoryDropdown onChange={handleCategoryChange} />
    </div>
  );
};

TripFilters.propTypes = {
  filterOptions: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  setFilterOptions: PropTypes.func.isRequired,
};

export default TripFilters;
