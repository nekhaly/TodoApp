import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TodoContext from './../TodoContext';

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  const handleDeleteTodo = (todo) => {
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  return (
    <ul className="list-group w-100">
      {state.todos.map((todo, index) => (
        <li
          key={index}
          className={`list-group-item ${todo.completed ? 'text-decoration-line-through' : ''} ${isOverdue(todo.deadline) ? 'text-danger' : ''}`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>{todo.task} {todo.deadline && `(Deadline: ${todo.deadline})`}</div>
            <div>
              <button type="button" class="btn btn-outline-light border border-0 text-danger" onClick={() => handleDeleteTodo(todo)}>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </button>
            </div>
          </div>
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
