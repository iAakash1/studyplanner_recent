let tasks = [];
let completedTasks = [];

// Add a new task
function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    if (description && deadline) {
        tasks.push({ description, deadline, completed: false });
        document.getElementById("description").value = "";
        document.getElementById("deadline").value = "";
        displayAllTasks();
    } else {
        alert("Please fill in both fields.");
    }
}

// Display all tasks
function displayAllTasks() {
    const taskList = document.getElementById("task-list");
    const completedTaskList = document.getElementById("completed-task-list");

    taskList.innerHTML = tasks.map((task, index) => `
        <div class="task-item">
            <strong>Task ${index + 1}:</strong> ${task.description} <br>
            <strong>Deadline:</strong> ${task.deadline}
        </div>
    `).join('');

    completedTaskList.innerHTML = completedTasks.map((task, index) => `
        <div class="task-item completed">
            <strong>Completed Task ${index + 1}:</strong> ${task.description} <br>
            <strong>Deadline:</strong> ${task.deadline}
        </div>
    `).join('');
}

// Complete a task
function completeTask() {
    const taskIndex = parseInt(document.getElementById("complete-task-index").value) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        completedTasks.push(task);
        tasks.splice(taskIndex, 1);
        alert("Task completed!");
        displayAllTasks();
    } else {
        alert("Invalid task number.");
    }
}

// Delete a specific task
function deleteTask() {
    const taskIndex = parseInt(document.getElementById("delete-task-index").value) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
        alert("Task deleted!");
        displayAllTasks();
    } else {
        alert("Invalid task number.");
    }
}

// Edit a task
function editTask() {
    const taskIndex = parseInt(document.getElementById("edit-task-index").value) - 1;
    const newDescription = document.getElementById("new-description").value;
    const newDeadline = document.getElementById("new-deadline").value;

    if (taskIndex >= 0 && taskIndex < tasks.length) {
        if (newDescription) tasks[taskIndex].description = newDescription;
        if (newDeadline) tasks[taskIndex].deadline = newDeadline;
        alert("Task edited!");
        displayAllTasks();
    } else {
        alert("Invalid task number.");
    }
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    completedTasks = [];
    displayAllTasks();
    alert("All tasks cleared!");
}

// Show progress
function showProgress() {
    const totalTasks = tasks.length + completedTasks.length;
    const completed = completedTasks.length;
    alert(`You have completed ${completed} out of ${totalTasks} tasks.`);
}
