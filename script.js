// Initialize StudyPlanner instance
const studyPlanner = new StudyPlanner();

function updateProgress() {
    const totalTasks = studyPlanner.getTotalTasks();
    const completedTasks = studyPlanner.getCompletedTasks();
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById("completed-bar").style.width = progress + "%";
    document.getElementById("pending-bar").style.width = (100 - progress) + "%";
    document.getElementById("progress-output").textContent = `${Math.round(progress)}% completed`;

    console.log("Progress updated:", progress);
}

function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    if (description && deadline) {
        studyPlanner.addTask(description, deadline);
        alert("Task added!");
        updateProgress();
        renderTasks();
    } else {
        alert("Please fill in both description and deadline.");
    }
}

function completeTask() {
    studyPlanner.completeTask();
    updateProgress();
    renderTasks();
}

function undoLastCompletedTask() {
    studyPlanner.undoLastCompletedTask();
    updateProgress();
    renderTasks();
}

function displayAllTasks() {
    renderTasks();
}

function displayCompletedTasks() {
    renderTasks(true);
}

function renderTasks(showCompleted = false) {
    const tasks = showCompleted ? studyPlanner.getCompletedTasksList() : studyPlanner.getTasks();
    const output = document.getElementById("output");
    output.innerHTML = tasks.length
        ? tasks.map(task => `
            <div class="task-card ${task.completed ? 'completed' : ''}">
                <div>
                    <strong>${task.description}</strong><br>
                    <small>Deadline: ${task.deadline}</small>
                </div>
                <button onclick="deleteTask('${task.description}')">🗑️</button>
            </div>
        `).join('')
        : `<p>No ${showCompleted ? 'completed' : ''} tasks available.</p>`;

    console.log("Tasks rendered:", tasks);
}

function deleteTask(description) {
    studyPlanner.deleteTask(description);
    alert(`Task "${description}" deleted!`);
    renderTasks();
    updateProgress();
}

function displayUpcomingDeadlineTask() {
    const upcomingTask = studyPlanner.getUpcomingDeadlineTask();
    document.getElementById("output").innerHTML = upcomingTask
        ? `
            <div class="task-card">
                <strong>Next Deadline:</strong> ${upcomingTask.description}<br>
                <small>Deadline: ${upcomingTask.deadline}</small>
            </div>`
        : "<p>No upcoming tasks with deadlines.</p>";

    console.log("Upcoming deadline task displayed:", upcomingTask);
}

// Call updateProgress initially to set the progress bar
updateProgress();
