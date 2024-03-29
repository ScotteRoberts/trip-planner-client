import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CategoryDropdown.css';

class CategoryDropdown extends Component {
  static propTypes = {
    name: PropTypes.string,
    form: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: '',
    form: '',
    className: '',
  };

  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <select
        name={this.props.name}
        form={this.props.form}
        onChange={this.handleChange}
        value={this.props.value}
        className={`category-dropdown ${this.props.className}`}
      >
        <option value="">- Select a Category -</option>
        <option value="None">None</option>
        <option value="Business Trip">Business Trip</option>
        <option value="Vacation">Vacation</option>
      </select>
    );
  }
}

export default CategoryDropdown;
