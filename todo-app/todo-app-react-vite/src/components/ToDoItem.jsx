import React from 'react';

const ToDoItem = ({ todo, onToggle, onDelete }) => {
  const { id, title, description, completed } = todo;

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <div>
        <strong>{title}</strong>
        <small>{description}</small>
      </div>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, !completed)}
        />
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
};

export default ToDoItem;