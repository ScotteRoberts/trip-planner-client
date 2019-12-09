import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CategoryDropdown.css';

// HACK: Clean this up to be reusable later
export default class CategoryDropdown extends Component {
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
    console.log(event);
    this.props.onChange(event.target.value);
  };

  render() {
    console.log(this.props);
    return (
      <select
        name={this.props.name}
        form={this.props.form}
        onChange={this.handleChange}
        defaultValue={this.props.value}
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
