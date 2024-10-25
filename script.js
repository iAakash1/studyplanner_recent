document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

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

    window.addTask = function() {
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
    };

    window.completeTask = function() {
        studyPlanner.completeTask();
        updateProgress();
        renderTasks();
    };

    window.undoLastCompletedTask = function() {
        studyPlanner.undoLastCompletedTask();
        updateProgress();
        renderTasks();
    };

    window.displayAllTasks = function() {
        renderTasks();
    };

    window.displayCompletedTasks = function() {
        renderTasks(true);
    };

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

    window.deleteTask = function(description) {
        studyPlanner.deleteTask(description);
        alert(`Task "${description}" deleted!`);
        renderTasks();
        updateProgress();
    };

    window.displayUpcomingDeadlineTask = function() {
        const upcomingTask = studyPlanner.getUpcomingDeadlineTask();
        document.getElementById("output").innerHTML = upcomingTask
            ? `
                <div class="task-card">
                    <strong>Next Deadline:</strong> ${upcomingTask.description}<br>
                    <small>Deadline: ${upcomingTask.deadline}</small>
                </div>`
            : "<p>No upcoming tasks with deadlines.</p>";

        console.log("Upcoming deadline task displayed:", upcomingTask);
    };

    // Initial Progress Update
    updateProgress();
});
