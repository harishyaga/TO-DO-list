// Select Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.getElementById("clearTasks");
const themeToggle = document.getElementById("themeToggle");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task Event
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value.trim());
        saveTask(taskInput.value.trim());
        taskInput.value = ""; // Clear input field
    }
});

// Function to Add Task
function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Mark as complete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTaskStatus(taskText, li.classList.contains("completed"));
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.classList.add("fade-out");
        setTimeout(() => {
            li.remove();
            removeTask(taskText);
        }, 300);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save Task to Local Storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            taskList.lastChild.classList.add("completed");
        }
    });
}

// Update Task Status in Local Storage
function updateTaskStatus(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task from Local Storage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All Tasks
clearTasksBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});

// Toggle Dark Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});
