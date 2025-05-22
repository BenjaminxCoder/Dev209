import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ToDoInput from '../components/ToDoInput';
import ToDoList from '../components/ToDoList';
import '../styles.css';

const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const [authToken, setAuthToken] = useState('');

  function getAuthToken() {
    try {
      const name = 'authToken=';
      const decoded = decodeURIComponent(document.cookie);
      const cookies = decoded.split(';');
      for (let c of cookies) {
        if (c.trim().startsWith(name)) {
          return c.trim().substring(name.length);
        }
      }
    } catch (e) {
      console.error("Failed to read auth token from cookie:", e);
    }
    return null;
  }

  useEffect(() => {
    const token = getAuthToken();
    setAuthToken(token);

    if (token) {
      const savedTodos = JSON.parse(localStorage.getItem(`todos-${token}`) || '[]');
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    console.log("Loaded todos:", todos);
  }, [todos]);

  const handleAddTodo = ({ title, description }) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem(`todos-${authToken}`, JSON.stringify(updatedTodos));
  };

  const handleToggleTodo = (id, completed) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(`todos-${authToken}`, JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(`todos-${authToken}`, JSON.stringify(updatedTodos));
  };

  return (
    <div className="App">
      <Header onLogout={() => {
        document.cookie = 'authToken=; Max-Age=0; path=/';
        window.location.href = '/login';
      }} />
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
    </div>
  );
};

export default ToDoPage;