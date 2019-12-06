import React from 'react';
import Todo from './Todo';

const TodoList = props => {
  // TODO: Bring in the todo list
  console.log(props);
  return (
    <div>
      {props.todos.map((todo, index) => (
        <Todo key={index} todo={todo} onEdit={props.onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
