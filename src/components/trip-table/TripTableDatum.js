import React from 'react';
import PropTypes from 'prop-types';
import { TripType } from '../../common/trip/Trip.model';
import './TripTableDatum.css';

import Emoji from '../emjoi/Emoji';
import {
  completedTodos,
  incompleteTodos,
  parseTimeToDays,
} from '../../common/todo/Todo.util';

const TripTableDatum = props => {
  const handleRowSelect = event => {
    if (
      event.type === 'click' ||
      (event.type === 'keydown' && event.key === 'Enter')
    )
      props.onTripSelect(props.trip);
  };
  const {
    title,
    destination,
    description,
    tripDuration,
    category,
    reminder,
    todos,
    planningState,
  } = props.trip;

  return (
    <tr
      tabIndex="0"
      role="button"
      aria-pressed="false"
      aria-label={`Trip Record for ${title}`}
      onClick={handleRowSelect}
      onKeyDown={handleRowSelect}
    >
      <td>{title}</td>
      <td>{destination}</td>
      <td>{description}</td>
      <td>{`${parseTimeToDays(tripDuration)} Days`}</td>
      <td>{category}</td>
      <td>
        {reminder.isSet ? (
          <Emoji label="checkmark" icon="✅" />
        ) : (
          <Emoji label="not here" icon="⛔️" />
        )}
      </td>
      <td>{incompleteTodos(todos)}</td>
      <td>{completedTodos(todos)}</td>
      <td>{planningState}</td>
    </tr>
  );
};

TripTableDatum.propTypes = {
  trip: TripType,
  onTripSelect: PropTypes.func.isRequired,
};

export default TripTableDatum;
