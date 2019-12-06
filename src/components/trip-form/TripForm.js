import React, { Component } from 'react';
import './TripForm.css';

import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-date-picker';
import TodoList from '../todo-list';
import CategoryDropdown from '../category-dropdown';

// FIXME: Make sure you add in the tripDuration somewhere.......

class TripForm extends Component {
  render() {
    const {
      title,
      destination,
      description,
      startDate,
      endDate,
      reminder,
    } = this.props.currentListing;
    console.log(this.props.currentListing);
    // TODO: Make sure to make a submit handler for this form! Prevent those defaults!
    return (
      <form className="trip-form">
        <div className="trip-form__fields">
          <label htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={this.props.onInputChange}
            />
          </label>

          <label htmlFor="destination">
            Destination:
            <input
              type="text"
              name="destination"
              id="destination"
              value={destination}
              onChange={this.props.onInputChange}
            />
          </label>

          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={this.props.onInputChange}
            />
          </label>

          <label htmlFor="category">
            Category:
            <CategoryDropdown
              name="category"
              onChange={newCategory =>
                this.props.onNamedChange('category', newCategory)
              }
            />
          </label>

          <label htmlFor="start-date">
            Start Date:
            <DatePicker
              name="start-date"
              onChange={date => this.props.onNamedChange('startDate', date)}
              value={startDate}
            />
          </label>

          <label htmlFor="end-date">
            End Date:
            <DatePicker
              name="end-date"
              onChange={date => this.props.onNamedChange('endDate', date)}
              value={endDate}
            />
          </label>
        </div>

        {/* ====================================================== */}

        <TodoList todos={this.props.currentListing.todos} />

        {/* ====================================================== */}

        <label htmlFor="reminder">
          Set Reminder:
          <DateTimePicker
            name="reminder"
            onChange={date => this.props.onDateTimePicker('dateTime', date)}
            value={reminder.dateTime}
          />
        </label>

        {/* ====================================================== */}

        <div className="trip">
          <button onClick={this.props.onSaveTrip}>Save</button>
          <button onClick={this.props.onCancelTrip}>Cancel</button>
          <button onClick={this.props.onDeleteTrip}>Delete</button>
        </div>
      </form>
    );
  }
}

export default TripForm;
