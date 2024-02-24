import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import TodoContext from './../TodoContext';

// Mocking the context value for testing
const mockState = {
	todos: [{
			taskName: 'Test task 1',
			completed: false,
			deadline: null
		},
		{
			taskName: 'Test task 2',
			completed: true,
			deadline: '2024-02-20T10:00:00'
		},
	],
};
const mockDispatch = jest.fn();

// Mocking font awesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: jest.fn(),
}));

function renderTodoList() {
	return render( <TodoContext.Provider value = {
			{
				state: mockState,
				dispatch: mockDispatch,
				createTodo: mockDispatch,
				toggleTodoCompleted: mockDispatch,
				removeTodo: mockDispatch
			}
		}>
			<TodoList />
		</TodoContext.Provider>
	);
}

describe('TodoList component', () => {
	test('renders todo items correctly', () => {
		renderTodoList();
		const todoItems = screen.getAllByRole('listitem');
		expect(todoItems).toHaveLength(2);
	});

	test('toggles completion status when the "mark as completed" button is clicked', () => {
		renderTodoList();
		const toggleButton = screen.getByTestId('toggle_completed_0');
		fireEvent.click(toggleButton);
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_COMPLETE',
			payload: mockState.todos[0]
		});
	});

	test('deletes a todo item when the delete button is clicked', () => {
		renderTodoList();
		const deleteButton = screen.getByTestId('delete_0');
		fireEvent.click(deleteButton);
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'DELETE_TODO',
			payload: mockState.todos[0]
		});
	});
});
