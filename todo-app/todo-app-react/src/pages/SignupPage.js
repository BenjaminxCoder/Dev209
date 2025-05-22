import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(user => user.email === email);

    if (exists) {
      alert('Email already registered.');
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please log in.');
    navigate('/login');
  };

  return (
    <div className="App">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="todo-form">
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;