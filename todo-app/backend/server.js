const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const users = {};
const todosByUser = {};

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users[username] = { password };
  todosByUser[username] = [];
  res.status(201).json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.cookie('authToken', username, {
    sameSite: 'Lax',
    secure: false
  });
  res.json({ token: username });
});

function authMiddleware(req, res, next) {
  const user = req.cookies.authToken;
  if (!user || !users[user]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user;
  next();
}

app.get('/todos', authMiddleware, (req, res) => {
  res.json(todosByUser[req.user]);
});

app.post('/todos', authMiddleware, (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: Date.now(),
    title,
    description,
    completed: false
  };
  todosByUser[req.user].push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', authMiddleware, (req, res) => {
  const todos = todosByUser[req.user];
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.completed = req.body.completed;
  res.json(todo);
});

app.delete('/todos/:id', authMiddleware, (req, res) => {
  todosByUser[req.user] = todosByUser[req.user].filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});