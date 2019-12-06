import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  // uses newer arrow sytnax to bind method to this
  handleChange = event => {
    // capture the input data from the event
    // update state
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.searchText);
  };

  render() {
    return (
      <form id="search" onSubmit={this.handleSubmit}>
        <label htmlFor="search-text">
          <span role="img" aria-label="magnifying glass" className="icon">
            🔎
          </span>
        </label>
        <input
          type="text"
          name="search-text"
          id="search-text"
          value={this.state.searchText}
          onChange={this.handleChange}
        />
        <button type="submit">Go!</button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
