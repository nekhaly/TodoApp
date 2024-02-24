import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TodoContext from '../TodoContext';

const TodoInput = () => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');
  const [deadline, setDeadline] = useState(null);
  const { dispatch } = useContext(TodoContext);
  const charLimitErrorText = 'Task must be longer than 10 characters.';

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
    if (event.target.value.length > 10) {
      setError('');
    } else {
      setError(charLimitErrorText);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && taskName.trim() !== '') {
      createTodo();
    }
  };

  const createTodo = () => {
    if (taskName.length > 10) {
      // Dispatch action to add todo with task and deadline
      dispatch({ type: 'ADD_TODO', payload: { taskName, completed: false, deadline } });

      // Clear input field and deadline after saving todo
      setTaskName('');
      setDeadline(null);
      setError('');
    } else {
      setError(charLimitErrorText);
    }
  };

  return (
    <div className="w-100">
      <div className="d-flex gap-2">
        <div className={"input-group input-group-lg"}>
          <input
            className={"form-control" + (error && " border border-danger")}
            value={taskName}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            placeholder="Enter task..."
          />
          <button
            className={"input-group-text"}
            onClick={createTodo}
          >
            <FontAwesomeIcon icon="fa-solid fa-play" />
          </button>
        </div>
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
        />
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default TodoInput;
