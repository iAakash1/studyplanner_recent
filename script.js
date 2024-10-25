let tasks = [];
let completedTasks = [];

function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    if (description && deadline) {
        tasks.push({ description, deadline, completed: false });
        document.getElementById("description").value = "";
        document.getElementById("deadline").value = "";
        alert("Task added!");
        displayAllTasks();
    } else {
        alert("Please fill in both fields.");
    }
}

function completeTask() {
    const taskIndex = prompt("Enter the task number to complete:") - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        task.completed = true;
        completedTasks.push(task);
        tasks.splice(taskIndex, 1);
        alert("Task completed!");
        displayAllTasks();
    } else {
        alert("Invalid task number.");
    }
}

function undoLastCompletedTask() {
    if (completedTasks.length === 0) {
        alert("No completed tasks to undo.");
        return;
    }

    const task = completedTasks.pop();
    task.completed = false;
    tasks.unshift(task);
    alert("Last completed task undone!");
    displayAllTasks();
}

function displayAllTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";  // Clear existing content

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <strong>Task ${index + 1}:</strong> ${task.description} <br>
            <strong>Deadline:</strong> ${task.deadline}
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(taskItem);
    });

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item completed";
        taskItem.innerHTML = `
            <strong>Completed Task ${tasks.length + index + 1}:</strong> ${task.description} <br>
            <strong>Deadline:</strong> ${task.deadline}
        `;
        taskList.appendChild(taskItem);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayAllTasks();
}

function editTask(index) {
    const newDescription = prompt("Enter new task description:", tasks[index].description);
    const newDeadline = prompt("Enter new deadline (YYYY-MM-DD):", tasks[index].deadline);
    
    if (newDescription && newDeadline) {
        tasks[index].description = newDescription;
        tasks[index].deadline = newDeadline;
        displayAllTasks();
    } else {
        alert("Both fields are required.");
    }
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        completedTasks = [];
        alert("All tasks cleared!");
        displayAllTasks();
    }
}

function displayUpcomingTasks() {
    const today = new Date().toISOString().split("T")[0];
    const upcomingTasks = tasks.filter(task => task.deadline >= today);
    
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";  // Clear existing content

    if (upcomingTasks.length === 0) {
        taskList.innerHTML = "<div>No upcoming tasks found.</div>";
    } else {
        upcomingTasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-item";
            taskItem.innerHTML = `
                <strong>Upcoming Task ${index + 1}:</strong> ${task.description} <br>
                <strong>Deadline:</strong> ${task.deadline}
            `;
            taskList.appendChild(taskItem);
        });
    }
}
