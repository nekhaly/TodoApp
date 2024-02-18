import React, { useState, useContext } from 'react';
import TodoContext from '../TodoContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoInput = (props) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [deadline, setDeadline] = useState(null);
  const { dispatch } = useContext(TodoContext);
  const charLimitErrorText = 'Task must be longer than 10 characters.';

  const handleInputChange = (event) => {
    setTask(event.target.value);
    if (event.target.value.length > 10) {
      setError('');
    } else {
      setError(charLimitErrorText);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && task.trim() !== '') {
      if (task.length > 10) {
        // Dispatch action to add todo with task and deadline
        dispatch({ type: 'ADD_TODO', payload: { task, completed: false, deadline } });

        // Clear input field and deadline after saving todo
        setTask('');
        setDeadline(null);
        setError('');
      } else {
        setError(charLimitErrorText);
      }
    }
  };

  return (
    <div className="w-100">
      <div className="d-flex gap-2">
        <input
          className={"form-control-lg w-100 " + (error && 'border border-danger')}
          value={task}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter task..."
        />
        <DatePicker
          showIcon
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          minDate={new Date()}
          dateFormat="dd-MM-yyyy h:mm aa"
          placeholderText="Select deadline"
          className="form-control-lg w-100"
          onKeyPress={handleKeyPress}
        />
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default TodoInput;
