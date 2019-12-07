import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { Todo } from '../todo/Todo.model';

const thirtyMinFromNow = new Date(Date.now() + 30 * 60000);

/**
 * Trip Model
 */
export class Trip {
  constructor() {
    this.id = uuid();
    this.title = '';
    this.destination = '';
    this.description = '';
    this.startDate = thirtyMinFromNow;
    this.endDate = thirtyMinFromNow;
    this.tripDuration = 0;
    this.category = '';
    this.reminder = {
      isSet: false,
      // Add default to 30 minutes from now
      dateTime: thirtyMinFromNow,
    };
    this.todos = [];
    this.planningState = 'created';
  }
}

export const PlanningStates = {
  created: 'Created',
  inProgress: 'In Progress',
  ready: 'Ready',
};

export const VacationState = {
  none: 'None',
  business: 'Business',
  vacation: 'Vacation',
};

export const DateStringType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
]);
