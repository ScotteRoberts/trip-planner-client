import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TripForm.css';

import DateTimePicker from 'react-datetime-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import CategoryDropdown from '../category-dropdown';

import { TripPropType } from '../../common/trip/Trip.model';

import {
  titleValidation,
  destinationValidation,
  descriptionValidation,
  startDateValidation,
  reminderDateValidation,
  categoryValidation,
} from '../../common/trip/Trip.validations';

class TripForm extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,

    currentTrip: TripPropType.isRequired,

    isNewTrip: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onNamedChange: PropTypes.func.isRequired,
    onReminderChange: PropTypes.func.isRequired,
    onReminderSet: PropTypes.func.isRequired,
    onSaveTrip: PropTypes.func.isRequired,
    onCancelTrip: PropTypes.func.isRequired,
    onDeleteTrip: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      validFields: {
        title: false,
        destination: false,
        description: false,
        dateRange: false,
        reminder: false,
      },
      touched: { ...this.validFields },
    };
  }

  resetValidation = () => {
    this.setState({ touched: this.state.validFields });
  };

  handleSaveTrip = event => {
    this.resetValidation();
    this.props.onSaveTrip();
  };

  handleCancelTrip = event => {
    this.resetValidation();
    this.props.onCancelTrip();
  };

  handleDeleteTrip = event => {
    this.resetValidation();
    this.props.onDeleteTrip();
  };

  validate = currentTrip => {
    const {
      title,
      destination,
      description,
      category,
      startDate,
      reminder,
    } = currentTrip;
    return {
      title: titleValidation(title),
      destination: destinationValidation(destination),
      description: descriptionValidation(description),
      category: categoryValidation(category),
      dateRange: startDateValidation(startDate), // TODO: Add end date validations
      reminder:
        !reminder.isSet || reminderDateValidation(startDate, reminder.dateTime),
    };
  };

  handleBlur = field => evt => {
    this.setState(prevState => ({
      touched: { ...prevState.touched, [field]: true },
    }));
  };

  canBeSubmitted() {
    const validations = this.validate(this.props.currentTrip);
    const isValid = Object.keys(validations).every(field => validations[field]);
    return isValid;
  }

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

    const validations = this.validate(this.props.currentTrip);
    const isValid = Object.keys(validations).every(field => validations[field]);
    const isDisabled = !isValid;

    const shouldMarkError = field => {
      const hasError = !validations[field];
      const shouldShow = this.state.touched[field];

      return hasError && shouldShow;
    };

    return (
      <form onSubmit={this.handleSaveTrip} className="trip-form">
        <h2>Plan A New Trip</h2>
        <div className="trip-form-fields">
          <label className="input-container" htmlFor="title">
            Title:
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="title"
              onChange={this.props.onInputChange}
              onBlur={this.handleBlur('title')}
              className={shouldMarkError('title') ? '--error' : ''}
            />
          </label>

          <label className="input-container" htmlFor="destination">
            Destination:
            <input
              type="text"
              name="destination"
              id="destination"
              placeholder="destination"
              value={destination}
              onChange={this.props.onInputChange}
              onBlur={this.handleBlur('destination')}
              className={shouldMarkError('destination') ? '--error' : ''}
            />
          </label>

          <label className="input-container" htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              value={description}
              onChange={this.props.onInputChange}
              onBlur={this.handleBlur('description')}
              className={shouldMarkError('description') ? '--error' : ''}
            />
          </label>

          <div className="input-container">
            Category:
            <CategoryDropdown
              name="category"
              value={category}
              defaultValue={category}
              onChange={newCategory =>
                this.props.onNamedChange('category', newCategory)
              }
              onBlur={this.handleBlur('category')}
              className={shouldMarkError('category') ? '--error' : ''}
            />
          </div>
        </div>

        {/* ====================================================== */}

        <div className="trip-form-daterange-picker-container">
          Select Vacation Days:
          <DateRangePicker
            required
            value={[new Date(startDate), new Date(endDate)]}
            onChange={dateRange => {
              this.props.onNamedChange('startDate', dateRange[0]);
              this.props.onNamedChange('endDate', dateRange[1]);
            }}
            clearIcon={null}
            onBlur={this.handleBlur('dateRange')}
            className={`trip-form-daterange-picker ${
              shouldMarkError('dateRange') ? '--error' : ''
            }`}
          />
        </div>

        <div>
          <h3>Set Reminder:</h3>
          <div className="trip-form-datetime-picker-container">
            <input
              type="checkbox"
              name="reminder"
              id="reminder"
              checked={reminder.isSet}
              onChange={this.props.onReminderSet}
            />
            <DateTimePicker
              value={new Date(reminder.dateTime)}
              onChange={date => this.props.onReminderChange('dateTime', date)}
              clearIcon={null}
              className="trip-form-datetime-picker"
            />
          </div>
        </div>

        {/* ====================================================== */}

        {this.props.children}

        {/* ====================================================== */}

        <div className="trip-form--toolbar">
          <button type="submit" disabled={isDisabled}>
            Save
          </button>
          <button type="button" onClick={this.handleCancelTrip}>
            Cancel
          </button>
          {!this.props.isNewTrip && (
            <button type="button" onClick={this.handleDeleteTrip}>
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default TripForm;
