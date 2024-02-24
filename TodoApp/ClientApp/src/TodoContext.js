import React, { createContext, useReducer, useEffect } from 'react';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api';

const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || []
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return {
        ...state,
        todos: action.payload
      };
		case 'ADD_TODO':
			addTodo(action.payload);
			return {
				...state,
				todos: [...state.todos, action.payload]
			};
		case 'DELETE_TODO':
			removeTodo(action.payload);
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload)
			};
		case 'TOGGLE_COMPLETE':
			toggleTodoCompleted(state, action.payload);
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
				)
			};
		default:
			return state;
	}
};

const addTodo = async (todoData) => {
	try {
		// Make API call to create a new todo
		await createTodo(todoData);
	} catch (error) {
		console.error('Error creating todo:', error);
	}
};

const toggleTodoCompleted = async (state, todoId) => {
	try {
		const currentTodo = state.todos.find(todo => todo.id === todoId);
		// Make API call to update a todo
		await updateTodo(todoId, { completed: !currentTodo.completed });
	} catch (error) {
		console.error('Error updating todo:', error);
	}
};

const removeTodo = async (todoId) => {
	try {
		// Make API call to delete a todo
		await deleteTodo(todoId);
	} catch (error) {
		console.error('Error deleting todo:', error);
	}
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

	useEffect(() => {
    // Fetch todos from the backend when the component mounts
    fetchTodos()
      .then(todos => {
        dispatch({ type: 'SET_TODOS', payload: todos });
		// Save todos to local storage to be used offline
		localStorage.setItem('todos', JSON.stringify(todos));
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
