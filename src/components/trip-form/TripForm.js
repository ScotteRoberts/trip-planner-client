import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TripForm.css';

import DateTimePicker from 'react-datetime-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import CategoryDropdown from '../category-dropdown';
import TripFormTextInput from './TripFormTextInput';

import { TripPropType } from '../../common/trip/Trip.model';

import {
  titleValidation,
  destinationValidation,
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
    event.preventDefault();
    this.resetValidation();
    this.props.onSaveTrip();
  };

  handleCancelTrip = event => {
    event.preventDefault();
    this.resetValidation();
    this.props.onCancelTrip();
  };

  handleDeleteTrip = event => {
    event.preventDefault();
    this.resetValidation();
    this.props.onDeleteTrip();
  };

  handleBlur = field => evt => {
    this.setState(prevState => ({
      touched: { ...prevState.touched, [field]: true },
    }));
  };

  validate = currentTrip => {
    const { title, destination, category, startDate, reminder } = currentTrip;
    return {
      title: titleValidation(title),
      destination: destinationValidation(destination),
      category: categoryValidation(category),
      dateRange: startDateValidation(startDate), // TODO: Add end date validations
      reminder:
        !reminder.isSet || reminderDateValidation(startDate, reminder.dateTime),
    };
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

    const validations = this.validate(this.props.currentTrip);
    const isValid = Object.keys(validations).every(field => validations[field]);
    const isDisabled = !isValid;

    const shouldMarkError = field => {
      const hasError = !validations[field];
      const shouldShow = this.state.touched[field];

      return hasError && shouldShow;
    };

    const textInputs = [
      {
        id: 'title',
        value: title,
        label: 'Title',
        placeholder: 'How do you want to label your trip?',
      },
      {
        id: 'destination',
        value: destination,
        label: 'Destination',
        placeholder: 'Where are you going?',
      },
      {
        id: 'description',
        value: description,
        label: 'Description',
        placeholder: 'Extra details?',
      },
    ];

    return (
      <form onSubmit={this.handleSaveTrip} className="trip-form">
        <h2 className="trip-form-title">Plan A New Trip</h2>
        <div className="trip-form-fields">
          {textInputs.map(textInput => (
            <TripFormTextInput
              key={textInput.id}
              id={textInput.id}
              label={textInput.label}
              value={textInput.value}
              placeholder={textInput.placeholder}
              onInputChange={this.props.onInputChange}
              onBlur={this.handleBlur}
              className={shouldMarkError(textInput.id) ? '--error' : ''}
            />
          ))}

          <div className="input-container">
            Category:
            <CategoryDropdown
              name="category"
              value={category}
              onChange={newCategory =>
                this.props.onNamedChange('category', newCategory)
              }
              onBlur={this.handleBlur('category')}
              className={shouldMarkError('category') ? '--error' : ''}
            />
          </div>
        </div>

        {/* ====================================================== */}

        <div className="trip-form__reminder-container">
          Select Trip Days:
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

        {/* ====================================================== */}

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
