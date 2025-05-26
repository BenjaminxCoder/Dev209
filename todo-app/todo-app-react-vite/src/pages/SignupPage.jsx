import React from 'react';
import { useState } from 'react';
import { registerUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../CSS/register.css';

function SignupPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const result = await registerUser(form);
    if (result.success || result.token) {
      window.alert('User registered successfully! Please log in.');
      navigate('/login');
    } else {
      setError(result.message || 'Registration failed');
    }
  } catch (err) {
    setError('Server error or network issue');
    console.error(err);
  }
};

  return (
    <div className="wrapper">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={form.username}
            required
          />
          <label>Choose a username</label>
        </div>
        <div className="input-field">
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
          />
          <label>Create a password</label>
        </div>
        <button type="submit">Register</button>
        <div className="register">
          Already have an account? <a href="/login">Log in</a>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default SignupPage;