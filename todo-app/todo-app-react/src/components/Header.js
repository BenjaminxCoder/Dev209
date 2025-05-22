import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <h1>To-Do List</h1>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;