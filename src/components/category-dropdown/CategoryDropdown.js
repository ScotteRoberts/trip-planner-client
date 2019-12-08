import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CategoryDropdown.css';

// HACK: Clean this up to be reusable later
export default class CategoryDropdown extends Component {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <select
        name={this.props.name}
        form={this.props.form}
        onChange={this.handleChange}
        value={this.props.category}
        className="category-dropdown"
      >
        <option value="None">None</option>
        <option value="Business Trip">Business Trip</option>
        <option value="Vacation">Vacation</option>
      </select>
    );
  }
}
