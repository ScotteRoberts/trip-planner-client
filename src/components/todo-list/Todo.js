import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../../common/todo/Todo.model';
import './Todo.css';

const Todo = props => {
  const { todo, onChecked, onDelete } = props;

  // TODO: Handle Editing later...
  const handleDelete = event => {
    event.preventDefault();
    return onDelete(todo);
  };

  const handleChecked = event => onChecked(todo);

  console.log(todo.isCompleted);

  return (
    <div>
      <input
        type="checkbox"
        name={todo.id}
        id={todo.id}
        checked={todo.isCompleted}
        onChange={handleChecked}
      />
      <label htmlFor={todo.id}>{todo.description}</label>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

Todo.propTypes = {
  todo: TodoType,
  onChecked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
