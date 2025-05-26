import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import ToDoInput from '../components/ToDoInput.jsx';
import ToDoList from '../components/ToDoList.jsx';
import '../CSS/todo.css';

import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';

const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTodos() {
      try {
        const result = await fetchTodos();
        if (result.error || result.message === 'Unauthorized') {
          navigate('/login');
        } else {
          setTodos(result.todos || result); 
        }
      } catch (e) {
        setError('Failed to load todos');
      }
    }
    loadTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await addTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
    } catch {
      setError('Failed to add todo');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    await updateTodo(id, completed);
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Header onLogout={() => {
          document.cookie = 'authToken=; Max-Age=0; path=/';
          window.location.href = '/login';
        }} />
      </div>
      <div className="main-layout">
        <div className="sidebar">
          <ToDoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
        <div className="content">
          <ToDoInput onAdd={handleAddTodo} />
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ToDoPage;