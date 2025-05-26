import React from 'react';
import { useState } from 'react';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await loginUser(form);
    if (result.token) {
      window.location.href = '/todos';
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="wrapper">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={form.username}
            required
          />
          <label>Enter your username</label>
        </div>
        <div className="input-field">
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
          />
          <label>Enter your password</label>
        </div>
        <div className="forget">
          <label>
            <input type="checkbox" id="remember" />
            <p>Remember me</p>
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Log In</button>
        <div className="register">
          Don’t have an account? <a href="/register">Register</a>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;