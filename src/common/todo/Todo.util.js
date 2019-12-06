/**
 * Helper - get number of completed todos
 * @param {Todo[]} todoList
 */
export const completedTodos = todoList =>
  todoList.filter(todo => todo.isCompleted).length;

/**
 * Helper - get number of incomplete todos
 * @param {Todo[]} todoList
 */
export const incompleteTodos = todoList =>
  todoList.filter(todo => !todo.isCompleted).length;

/**
 * Add todo to given todolist
 */
export const addTodo = (todoList, todo) => {
  const updatedTodoList = [...todoList];
  updatedTodoList.push(todo);
  return updatedTodoList;
};

/**
 * Delete a todo by the id
 * @param {*} todoList original list
 * @param {*} id id to delete
 */
export const deleteTodoById = (todoList, id) =>
  todoList.filter(todo => todo.id !== id);

/**
 * Update the todo list with a record
 * @param {*} todoList original list
 * @param {*} updatedTodo record to update
 */
export const updateTodoById = (todoList, updatedTodo) => {
  const updatedTodoList = [...todoList];
  const updateIndex = updatedTodoList.findIndex(
    todo => todo.id === updatedTodo.id
  );
  if (updateIndex > -1) {
    updatedTodoList.splice(updateIndex, 1, updatedTodo);
  } else {
    updatedTodoList.push(updatedTodo);
  }
  return updatedTodoList;
};
