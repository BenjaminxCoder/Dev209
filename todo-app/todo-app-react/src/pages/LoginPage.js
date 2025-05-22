import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const match = users.find(user => user.email === email && user.password === password);

    if (match) {
      document.cookie = `authToken=${email}; path=/;`;
      navigate('/todos');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="todo-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default LoginPage;