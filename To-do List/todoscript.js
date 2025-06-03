let todos = [];
let filter = 'all';

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function editTodo(index) {
  const newText = prompt('Edit task:', todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText.trim();
    renderTodos();
  }
}

function deleteTodo(index) {
  const todoItem = document.querySelectorAll('.todo-item')[todos.indexOf(todos[index])];
  todoItem.classList.add('deleting');
  setTimeout(() => {
    todos.splice(index, 1);
    renderTodos();
  }, 500); // Delay deletion for visual effect
}

function filterTodos(newFilter) {
  filter = newFilter;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filters button[onclick="filterTodos('${filter}')"]`).classList.add('active');
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.className = `list-group-item todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleTodo(${todos.indexOf(todo)})">
      <span>${todo.text}</span>
      <div class="actions ms-auto ${todo.completed ? '' : 'd-none'}">
        <button class="edit-btn" onclick="editTodo(${todos.indexOf(todo)})">✏️</button>
        <button class="delete-btn" onclick="deleteTodo(${todos.indexOf(todo)})">🗑️</button>
      </div>
    `;
    todoList.appendChild(todoItem);
  });

  document.getElementById('total-count').textContent = todos.length;
  document.getElementById('active-count').textContent = todos.filter(todo => !todo.completed).length;
  document.getElementById('completed-count').textContent = todos.filter(todo => todo.completed).length;

  const activeCountSpan = document.querySelector('#active-count').parentElement;
  activeCountSpan.classList.toggle('active', filter === 'active');
}

document.getElementById('todo-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

// Initialize with a sample todo
todos.push({ text: 'Task', completed: false });
renderTodos();