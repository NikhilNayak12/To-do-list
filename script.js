const darkModeToggle = document.querySelector(".dark-mode-toggle");
const taskInput = document.querySelector(".task-input input");
const addBtn = document.querySelector(".add-btn");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearBtn = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// Render Tasks
function renderTasks(filter) {
  taskBox.innerHTML = "";
  todos.forEach((todo, index) => {
    if (filter === "pending" && todo.status === "completed") return;
    if (filter === "completed" && todo.status === "pending") return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.status === "completed" ? "completed" : ""}" onclick="toggleStatus(${index})">${todo.name}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskBox.appendChild(li);
  });
}

// Toggle Task Status
function toggleStatus(index) {
  todos[index].status = todos[index].status === "pending" ? "completed" : "pending";
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTasks(document.querySelector(".filters .active").id);
}

// Delete Task
function deleteTask(index) {
  todos.splice(index, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  renderTasks(document.querySelector(".filters .active").id);
}

// Add Task
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    todos.push({ name: taskInput.value.trim(), status: "pending" });
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskInput.value = "";
    renderTasks("all");
  }
});

// Clear All Tasks
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    renderTasks("all");
  }
});

// Handle Filters
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    filter.classList.add("active");
    renderTasks(filter.id);
  });
});

// Handle Dark Mode Toggle
const isDarkMode = localStorage.getItem("dark-mode") === "enabled";

if (isDarkMode) {
  document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkModeEnabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkModeEnabled ? "enabled" : "disabled");
});

// Initial Render
renderTasks("all");
