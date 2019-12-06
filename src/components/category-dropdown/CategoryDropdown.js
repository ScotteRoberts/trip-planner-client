import React, { Component } from 'react';
import './CategoryDropdown.css';

// HACK: Clean this up to be reusable later
export default class CategoryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: this.props.defaultValue,
    };
  }

  handleChange = event => {
    // capture the input data from the event
    // update state
    this.setState(
      {
        currentOption: event.target.value,
      },
      () => this.props.onChange(this.state.currentOption)
    );
  };

  render() {
    return (
      <select
        name={this.props.name}
        form={this.props.form}
        onChange={this.handleChange}
        value={this.state.currentOption}
      >
        <option value="">- Select a Category -</option>
        <option value="none">None</option>
        <option value="businessTrip">Business Trip</option>
        <option value="vacation">Vacation</option>
      </select>
    );
  }
}
