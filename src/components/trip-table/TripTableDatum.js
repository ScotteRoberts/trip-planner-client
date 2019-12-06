import React from 'react';
import PropTypes from 'prop-types';
import './TripTableDatum.css';

import Emoji from '../emjoi/Emoji';
import { completedTodos, incompleteTodos } from '../../common/todo/Todo.util';
import { DateStringType } from '../../common/trip/Trip.model';

const TripTableDatum = props => {
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
    <tr>
      <td>
        <button onClick={() => props.onTripSelect(props.trip)}>{title}</button>
      </td>
      <td>{destination}</td>
      <td>{tripDuration}</td>
      <td>{category}</td>
      <td>
        {reminder.isSet ? (
          <Emoji label="checkmark">✅</Emoji>
        ) : (
          <Emoji label="not here">⛔️</Emoji>
        )}
      </td>
      <td>{completedTodos(todos)}</td>
      <td>{incompleteTodos(todos)}</td>
      <td>{planningState}</td>
    </tr>
  );
};

TripTableDatum.propTypes = {
  trip: PropTypes.shape({
    title: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    reminder: PropTypes.shape({
      isSet: PropTypes.bool.isRequired,
      dateTime: DateStringType.isRequired,
    }).isRequired,
  }).isRequired,
  onTripSelect: PropTypes.func.isRequired,
};

export default TripTableDatum;
