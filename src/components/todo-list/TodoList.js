import React from 'react';
import PropTypes from 'prop-types';
import { Todo as TodoClass, TodoType } from '../../common/todo/Todo.model';
import Todo from './Todo';

import TodoInput from '../controlled-input-form';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTodo: new TodoClass(),
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => {
      const newTodo = { ...prevState.currentTodo };
      newTodo[name] = value;
      return { currentTodo: newTodo };
    });
  };

  handleAddTodo = todoText => {
    this.setState(
      prevState => {
        const newTodo = { ...prevState.currentTodo };
        newTodo.description = todoText;
        return { currentTodo: newTodo };
      },
      () => {
        this.props.onAddTodo(this.state.currentTodo);
        this.setState({ currentTodo: new TodoClass() });
      }
    );
  };

  // TODO: const handleEditTodo = event => {};

  render() {
    const todoListWindow = {
      height: this.props.height,
      maxHeight: this.props.maxHeight,
      overflow: 'auto',
    };

    return (
      <div className="todo-list">
        <h3>Todo List</h3>
        <div>
          <TodoInput
            icon="📋"
            aria-label="clipboard"
            placeholder="What to do..."
            buttonText="Add"
            clearable
            onSubmit={this.handleAddTodo}
          />
        </div>
        <div style={todoListWindow} className="todo-list--window">
          {this.props.todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              onChecked={this.props.onChecked}
              onEdit={this.props.onEditTodo}
              onDelete={this.props.onDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
  onAddTodo: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
  height: PropTypes.string,
};

TodoList.defaultProps = {
  maxHeight: 'auto',
  height: 'auto',
};

export default TodoList;
