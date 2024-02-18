import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TodoContext from './../TodoContext';

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  const handleDeleteTodo = (todo) => {
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  const handleToggleComplete = (todo) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: todo });
  };

  const formatDateTime = (dateTime) => {
    return new Intl.DateTimeFormat('en-GB', { 
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Berlin'
    }).format(new Date(dateTime));
  }

  return (
    <ul className="list-group w-100">
      {state.todos.map((todo, index) => (
        <li
          key={index}
          className={`list-group-item ${todo.completed ? 'text-decoration-line-through' : ''} ${isOverdue(todo.deadline) ? 'text-danger' : ''}`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-light border border-0 text-success"
                onClick={() => handleToggleComplete(todo)}
              >
                {todo.completed ? (
                  <FontAwesomeIcon icon="fa-solid fa-check-circle" />
                ) : (
                  <FontAwesomeIcon icon="fa-regular fa-circle" />
                )}
              </button>
              <div className="d-flex flex-column justify-content-center">
                <div>{todo.task}</div>
                <div className="text-sm text-muted fst-italic">{todo.deadline && `Due on: ${formatDateTime(todo.deadline)}`}</div>
              </div>
              
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-light border border-0 text-danger"
                onClick={() => handleDeleteTodo(todo)}
              >
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
