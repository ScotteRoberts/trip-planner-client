import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import { TodoType } from '../todo/Todo.model';

/**
 * @constant
 * @type {Date | String}
 */
const thirtyMinFromNow = new Date(Date.now() + 30 * 60000);

/**
 * @constant
 * @type {Date | String}
 */
const tomorrow = new Date(Date.now() + 24 * 60 * 60000);

/**
 * Possible planning states
 */
export const PlanningStates = {
  created: 'Created',
  inProgress: 'In Progress',
  ready: 'Ready',
};

/**
 * Possible vacation states
 */
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
    this.endDate = tomorrow;
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

/**
 * Dev Experience - Date type
 */
export const DateStringPropType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
]);

/**
 * Dev Experience - Trip type
 */
export const TripPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: DateStringPropType.isRequired,
  endDate: DateStringPropType.isRequired,
  tripDuration: DateStringPropType,
  category: PropTypes.string.isRequired,
  reminder: PropTypes.shape({
    isSet: PropTypes.bool,
    dateTime: DateStringPropType,
  }),
  todos: PropTypes.arrayOf(TodoType),
  planningState: PropTypes.string,
});
