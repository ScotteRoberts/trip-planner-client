import React from 'react';
import './TripTableData.css';

const completedTodos = todoList =>
  todoList.filter(todo => todo.isCompleted).length;
const incompleteTodos = todoList =>
  todoList.filter(todo => !todo.isCompleted).length;

const Listing = props => {
  const {
    title,
    destination,
    tripDuration,
    category,
    reminder,
    todos,
    planningState,
  } = props.listing;
  return (
    <tr>
      <td>
        <button onClick={() => props.onTripSelect(props.listing)}>
          {title}
        </button>
      </td>
      <td>{destination}</td>
      <td>{tripDuration}</td>
      <td>{category}</td>
      <td>{reminder.isSet}</td>
      <td>{completedTodos(todos)}</td>
      <td>{incompleteTodos(todos)}</td>
      <td>{planningState}</td>
    </tr>
  );
};

export default Listing;
