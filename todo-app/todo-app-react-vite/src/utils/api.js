const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include' 
  });
  return response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include' 
  });
  return response.json();
}

export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'GET',
    credentials: 'include' 
  });
  return response.json();
}

export async function addTodo(todo) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(todo)
  });
  return response.json();
}

export async function updateTodo(id, completed) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ completed })
  });
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return response.json();
}