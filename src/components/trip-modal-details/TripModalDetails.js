import React from 'react';
import PropTypes from 'prop-types';
import './TripModalDetails.css';

const TripModalDetails = props => {
  const {
    title,
    destination,
    tripDuration,
    category,
    reminder,
    todos,
    planningState,
  } = props.trip;
  return (
    <div className="trip-modal-details">
      <p>{title}</p>
      <p>{destination}</p>
      <p>{tripDuration}</p>
      <p>{category}</p>
      <p>{todos}</p>
      <p>{planningState}</p>
    </div>
  );
};

TripModalDetails.propTypes = {};

export default TripModalDetails;
