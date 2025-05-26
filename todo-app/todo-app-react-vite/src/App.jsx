import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ToDoPage from './pages/ToDoPage';

function getAuthToken() {
  const name = 'authToken=';
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');
  for (let c of cookies) {
    if (c.trim().startsWith(name)) {
      return c.trim().substring(name.length);
    }
  }
  return '';
}

function App() {
  const authToken = getAuthToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Navigate to="/todos" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/todos" element={authToken ? <ToDoPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;