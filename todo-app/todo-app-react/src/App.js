import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ToDoPage from './pages/ToDoPage';

function App() {
  const authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Navigate to="/todos" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todos" element={authToken ? <ToDoPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;