import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../../common/todo/Todo.model';
import './Todo.css';

const Todo = props => {
  const { todo, onDelete, onEdit } = props;
  const [isEdited, setIsEdited] = useState(false);

  const handleChecked = event => {
    const isCompleted = event.target.checked;
    const newTodo = { ...todo, isCompleted };
    onEdit(newTodo);
  };
  const handleEdit = event => {
    const newDescription = event.target.value;
    const newTodo = { ...todo, description: newDescription };
    onEdit(newTodo);
  };

  const handleDelete = event => {
    event.preventDefault();
    return onDelete(todo);
  };

  return (
    <div className="todo">
      <div>
        <input
          type="checkbox"
          name={todo.id}
          id={todo.id}
          checked={todo.isCompleted}
          onChange={handleChecked}
        />
        {isEdited ? (
          <input
            type="text"
            value={todo.description}
            onChange={handleEdit}
            className="todo__input-description"
          />
        ) : (
          <span className="todo__description">{todo.description}</span>
        )}
      </div>

      <div>
        {isEdited ? (
          <button type="button" onClick={() => setIsEdited(false)}>
            Save
          </button>
        ) : (
          <button type="button" onClick={() => setIsEdited(true)}>
            Edit
          </button>
        )}

        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: TodoType.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
