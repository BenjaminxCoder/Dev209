import React, { useState } from 'react';

const ToDoInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    await onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group">
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default ToDoInput;