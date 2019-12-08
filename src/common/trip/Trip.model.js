import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import { TodoType } from '../todo/Todo.model';

const thirtyMinFromNow = new Date(Date.now() + 30 * 60000);

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
    this.tripDuration = '0';
    this.category = VacationState.none;
    this.reminder = {
      isSet: false,
      // Add default to 30 minutes from now
      dateTime: thirtyMinFromNow,
    };
    this.todos = [];
    this.planningState = PlanningStates.created;
  }
}

export const DateStringType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
]);

export const TripType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: DateStringType.isRequired,
  endDate: DateStringType.isRequired,
  tripDuration: DateStringType,
  category: PropTypes.string.isRequired,
  reminder: PropTypes.shape({
    isSet: PropTypes.bool,
    dateTime: DateStringType,
  }),
  todos: PropTypes.arrayOf(TodoType),
  planningState: PropTypes.string,
});
