import React from 'react';
import './FilterPanel.css';
import SearchBar from '../search-bar';
import CategoryDropdown from '../category-dropdown';

const FilterPanel = props => {
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
    <aside className="filter-panel">
      <h2>Filters</h2>
      <SearchBar onSearch={handleSearch} />
      <CategoryDropdown onChange={handleCategoryChange} />
      {/* TODO: Style up the button and make it connect up */}
      <h2>Other</h2>
      {/* <button onClick={this.handleAddNewTrip}>Add a trip</button> */}
    </aside>
  );
};

export default FilterPanel;
