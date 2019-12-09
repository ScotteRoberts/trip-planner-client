import React from 'react';
import PropTypes from 'prop-types';
import './TripFilters.css';
import SearchBar from '../controlled-input-form';
import CategoryDropdown from '../category-dropdown';

const TripFilters = props => {
  const handleFilterChange = (property, value) => {
    const newOptions = { ...props.filterOptions, [property]: value };
    props.setFilterOptions(newOptions);
  };

  const handleSearch = inputText => {
    handleFilterChange('searchText', inputText);
  };

  const handleCategoryChange = category => {
    handleFilterChange('category', category);
  };

  return (
    <div className="trip-filters">
      <h2>Filters</h2>
      <SearchBar
        icon="🔎"
        placeholder="Search"
        aria-label="magnifying-glasss"
        buttonText="Go!"
        onSubmit={handleSearch}
        value={props.filterOptions.searchText}
      />
      <CategoryDropdown
        onChange={handleCategoryChange}
        value={props.filterOptions.category}
      />
      <h2>Actions</h2>
      <button className="trip-filters__button" onClick={props.onAddNewTrip}>
        Add a trip
      </button>
    </div>
  );
};

TripFilters.propTypes = {
  filterOptions: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  setFilterOptions: PropTypes.func.isRequired,
  onAddNewTrip: PropTypes.func.isRequired,
};

export default TripFilters;
