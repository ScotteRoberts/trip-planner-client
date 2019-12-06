import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { Todo } from '../todo/Todo.model';

/**
 * Trip Model
 */
export class Trip {
  constructor() {
    this.id = uuid();
    this.title = '';
    this.destination = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.tripDuration = 0;
    this.category = '';
    this.reminder = {
      isSet: false,
      dateTime: new Date(),
    };
    this.todos = [new Todo()];
    this.planningState = 'created';
  }
}

export const DateStringType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
]);
