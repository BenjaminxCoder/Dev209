


document.addEventListener('DOMContentLoaded', () => {
  const authToken = getAuthToken();
  if (!authToken) {
    window.location.href = 'login.html';
    return;
  }

  const todoForm = document.getElementById('todoForm');
  const todoList = document.getElementById('todoList');
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    document.cookie = 'authToken=; Max-Age=0; path=/';
    window.location.href = 'login.html';
  });

  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ title, description })
    });

    if (response.ok) {
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      loadTodos();
    }
  });

  async function loadTodos() {
    const response = await fetch('http://localhost:3000/todos', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const todos = await response.json();
    todoList.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <div>
          <strong>${todo.title}</strong><br/>
          <small>${todo.description}</small>
        </div>
        <div>
          <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo._id}" class="toggle-complete" />
          <button data-id="${todo._id}" class="delete-btn">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    });

    document.querySelectorAll('.toggle-complete').forEach(checkbox => {
      checkbox.addEventListener('change', async (e) => {
        const id = e.target.getAttribute('data-id');
        const completed = e.target.checked;

        await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ completed })
        });

        loadTodos();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id');

        await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });

        loadTodos();
      });
    });
  }

  function getAuthToken() {
    const name = 'authToken=';
    const decoded = decodeURIComponent(document.cookie);
    const cookies = decoded.split(';');
    for (let c of cookies) {
      if (c.trim().startsWith(name)) {
        return c.trim().substring(name.length);
      }
    }
    return null;
  }

  loadTodos();
});