import React, { useContext } from 'react';
import TodoContext from './../TodoContext';

const TodoList = () => {
  const { state } = useContext(TodoContext);

  return (
    <ul className="list-group w-100">
      {state.todos.map((todo, index) => (
        <li
          key={index}
          className={`list-group-item ${todo.completed ? 'text-decoration-line-through' : ''} ${isOverdue(todo.deadline) ? 'text-danger' : ''}`}
        >
          {todo.task} {todo.deadline && `(Deadline: ${todo.deadline})`}
        </li>
      ))}
    </ul>
  );
}

// Function to check if the task is overdue based on the deadline
const isOverdue = (deadline) => {
  if (!deadline) return false;
  const now = new Date();
  const taskDeadline = new Date(deadline);
  return now > taskDeadline;
};

export default TodoList;
