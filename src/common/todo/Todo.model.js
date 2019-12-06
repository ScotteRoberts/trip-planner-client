import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

/**
 * Todo Model
 */
export class Todo {
  constructor() {
    this.id = uuid();
    this.isCompleted = false;
    this.description = 'hey';
  }
}

/**
 * Todo Type
 */
export const TodoType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  description: PropTypes.string,
});
