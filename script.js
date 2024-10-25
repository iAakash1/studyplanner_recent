// Task and StudyPlanner classes (same as previous version)

const planner = new StudyPlanner();

// Switch between tabs
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'plannedTasksTab') displayPlannedTasks();
    if (tabId === 'completedTasksTab') displayCompletedTasks();
}

// Adding tasks
function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    if (description && deadline) {
        planner.addTask(description, deadline);
        document.getElementById("output").innerText = `Task added: ${description}`;
        displayPlannedTasks();
    }
}

// Completing tasks
function completeTask() {
    const description = document.getElementById("description").value;
    const result = planner.completeTask(description);
    document.getElementById("output").innerText = result;
    displayPlannedTasks();
}

// Undo completed tasks
function undoCompletedTask() {
    const result = planner.undoCompletedTask();
    document.getElementById("output").innerText = result;
    displayCompletedTasks();
}

// Display planned tasks in tab
function displayPlannedTasks() {
    const plannedTasksOutput = planner.displayPlannedTasks();
    document.getElementById("plannedTasksOutput").innerText = plannedTasksOutput || "No tasks planned!";
}

// Display completed tasks in tab
function displayCompletedTasks() {
    const completedTasksOutput = planner.displayCompletedTasks();
    document.getElementById("completedTasksOutput").innerText = completedTasksOutput || "No tasks completed yet!";
}

// Deleting tasks
function deleteTask() {
    const description = document.getElementById("description").value;
    const result = planner.deleteTask(description);
    document.getElementById("output").innerText = result;
    displayPlannedTasks();
}

// Show upcoming deadline
function showUpcomingDeadline() {
    const result = planner.showUpcomingDeadline();
    document.getElementById("output").innerText = result;
}

// Clear all tasks
function clearAllTasks() {
    const result = planner.clearAllTasks();
    document.getElementById("output").innerText = result;
    displayPlannedTasks();
}

// Initialize with the 'Add Task' tab active
showTab('addTaskTab');
