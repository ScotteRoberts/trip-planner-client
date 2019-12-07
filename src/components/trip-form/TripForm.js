import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TripForm.css';

import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-date-picker';
import CategoryDropdown from '../category-dropdown';

import { DateStringType } from '../../common/trip/Trip.model';

import {
  titleValidation,
  destinationValidation,
  descriptionValidation,
  startDateValidation,
  endDateValidation,
  reminderDateValidation,
} from '../../common/trip/Trip.validations';

class TripForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: {
        title: false,
        destination: false,
        description: false,
        startDate: false,
        endDate: false,
        reminder: false,
      },
    };
  }
  // TODO: Validate that the data exists before submission

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,

    currentTrip: PropTypes.shape({
      title: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      startDate: DateStringType.isRequired,
      endDate: DateStringType.isRequired,
      reminder: PropTypes.shape({
        isSet: PropTypes.bool.isRequired,
        dateTime: DateStringType.isRequired,
      }).isRequired,
    }).isRequired,

    isNewTrip: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onNamedChange: PropTypes.func.isRequired,
    onReminderChange: PropTypes.func.isRequired,
    onReminderSet: PropTypes.func.isRequired,
    onSaveTrip: PropTypes.func.isRequired,
    onCancelTrip: PropTypes.func.isRequired,
    onDeleteTrip: PropTypes.func.isRequired,
  };

  render() {
    const {
      title,
      destination,
      description,
      category,
      startDate,
      endDate,
      reminder,
    } = this.props.currentTrip;

    const isValidSubmission =
      titleValidation(title) &&
      destinationValidation(destination) &&
      descriptionValidation(description) &&
      startDateValidation(startDate) &&
      endDateValidation(startDate, endDate) &&
      reminderDateValidation(startDate, reminder.dateTime);

    // TODO: Make sure to make a submit handler for this form! Prevent those defaults!
    return (
      <form onSubmit={this.props.onSaveTrip} className="trip-form">
        <h2>Plan New Trip</h2>
        <div className="trip-form-fields">
          <label className="input-container" htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={this.props.onInputChange}
            />
          </label>

          <label className="input-container" htmlFor="destination">
            Destination:
            <input
              type="text"
              name="destination"
              id="destination"
              value={destination}
              onChange={this.props.onInputChange}
            />
          </label>

          <label className="input-container" htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={this.props.onInputChange}
            />
          </label>

          {/* FIXME: This will not reset on a new form */}
          <div className="input-container">
            Category:
            <CategoryDropdown
              name="category"
              defaultValue={category}
              onChange={newCategory =>
                this.props.onNamedChange('category', newCategory)
              }
            />
          </div>
        </div>

        {/* ====================================================== */}

        <div>
          <div>
            Start Date:
            <DatePicker
              name="start-date"
              onChange={date => this.props.onNamedChange('startDate', date)}
              value={new Date(startDate)}
            />
          </div>

          <div>
            End Date:
            <DatePicker
              name="end-date"
              onChange={date => this.props.onNamedChange('endDate', date)}
              value={new Date(endDate)}
            />
          </div>
        </div>

        <div>
          <h3>Set Reminder:</h3>
          <div>
            <input
              type="checkbox"
              name="reminder"
              id="reminder"
              checked={reminder.isSet}
              onChange={this.props.onReminderSet}
            />
            <DateTimePicker
              onChange={date => this.props.onReminderChange('dateTime', date)}
              value={new Date(reminder.dateTime)}
            />
          </div>
        </div>

        {/* ====================================================== */}

        {this.props.children}

        {/* ====================================================== */}

        <div>
          <button type="submit" disabled={!isValidSubmission}>
            Save
          </button>
          <button type="button" onClick={this.props.onCancelTrip}>
            Cancel
          </button>
          {!this.props.isNewTrip && (
            <button type="button" onClick={this.props.onDeleteTrip}>
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default TripForm;
