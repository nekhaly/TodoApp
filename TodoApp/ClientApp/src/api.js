// Function to fetch todos from the backend API
async function fetchTodos() {
	try {
		const response = await fetch('/api/todo');
		if (!response.ok) {
			throw new Error('Failed to fetch todos from the backend.');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching todos:', error);
		throw error;
	}
}

// Function to create a new todo using the backend API
async function createTodo(todoData) {
	try {
		const response = await fetch('/api/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todoData)
		});
		if (!response.ok) {
			throw new Error('Failed to create todo.');
		}
		return await response.json();
	} catch (error) {
		console.error('Error creating todo:', error);
		throw error;
	}
}

// Function to update an existing todo using the backend API
async function updateTodo(todoId, todoData) {
	try {
		const response = await fetch(`/api/todo/${todoId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todoData)
		});
		if (!response.ok) {
			throw new Error('Failed to update todo.');
		}
		return await response.json();
	} catch (error) {
		console.error('Error updating todo:', error);
		throw error;
	}
}

// Function to delete a todo using the backend API
async function deleteTodo(todoId) {
	try {
		const response = await fetch(`/api/todo/${todoId}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			throw new Error('Failed to delete todo.');
		}
	} catch (error) {
		console.error('Error deleting todo:', error);
		throw error;
	}
}

export {
	fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
}