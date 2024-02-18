import React, { createContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || []
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, action.payload]
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter(todo => todo !== action.payload)
			};
		case 'TOGGLE_COMPLETE':
			return {
				...state,
				todos: state.todos.map(todo =>
					todo === action.payload ? { ...todo, completed: !todo.completed } : todo
				)
			};
		default:
			return state;
	}
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
