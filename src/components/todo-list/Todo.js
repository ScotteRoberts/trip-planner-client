import React from 'react';
import './Todo.css';

const Todo = props => {
  const { todo, handleEdit, handleDelete } = props;
  return (
    <div>
      {/* TODO: Make a controlled form that hikes up the state change to todolist for each todo */}
      {/* FIXME: Right now, todo ids can conflict with each other, unless you use UUID */}
      <input
        type="checkbox"
        name={todo.id}
        id={todo.id}
        value={todo.isCompleted}
      />
      <label htmlFor={todo.id}>{todo.description}</label>
      {/* TODO: Drop the function down from todolist into this delete button */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Todo;
