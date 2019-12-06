import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Todo as TodoClass, TodoType } from '../../common/todo/Todo.model';
import Todo from './Todo';

const TodoList = props => {
  const [currentTodo, setCurrentTodo] = useState(new TodoClass());

  const handleAddTodo = event => {
    event.preventDefault();
    props.onAddTodo(currentTodo);
    setCurrentTodo(new TodoClass());
  };

  // TODO: const handleEditTodo = event => {};

  return (
    <div>
      {props.todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onChecked={props.onChecked}
          onDelete={props.onDelete}
        />
      ))}
      <button type="button" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
  onAddTodo: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  // onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
