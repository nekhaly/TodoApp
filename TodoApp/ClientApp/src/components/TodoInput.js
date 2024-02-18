import React, { useState, useContext } from 'react';
import TodoContext  from '../TodoContext';

const TodoInput = (props) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleInputChange = (event) => {
    setTask(event.target.value);
    if (event.target.value.length > 10) {
      setError('');
    } else {
      setError('Task must be longer than 10 characters.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && task.trim() !== '') {
      if (task.length > 10) {
        // Dispatch action to add todo
        dispatch({ type: 'ADD_TODO', payload: { task, completed: false } });

        // Clear input field after saving todo
        setTask('');
        setError('');
      } else {
        setError('Task must be longer than 10 characters.');
      }
    }
  };

  return (
    <div className="w-100">
      <input
        className={"form-control-lg w-100 " + (error && 'invalid')}
        value={task}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter task..."
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default TodoInput;