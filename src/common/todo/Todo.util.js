export const addTodo = (todoList, todo) => {
  const updatedTodoList = [...todoList];
  updatedTodoList.push(todo);
  return updatedTodoList;
};

export const removeTodo = () => {};

export const editTodo = () => {};
