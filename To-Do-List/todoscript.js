// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
  } else {
    alert("Please enter a task.");
  }
});

// Add Task to DOM
function addTask(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  if (isCompleted) {
    li.classList.add("completed");
  }

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const actionsDiv = document.createElement("div");
  const completeBtn = document.createElement("button");
  completeBtn.className = "btn btn-success btn-sm me-2";
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateLocalStorage();
  });

  actionsDiv.appendChild(completeBtn);
  actionsDiv.appendChild(deleteBtn);
  li.appendChild(taskSpan);
  li.appendChild(actionsDiv);
  taskList.appendChild(li);
}

// Save Task to Local Storage
function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

// Update Local Storage
function updateLocalStorage() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}