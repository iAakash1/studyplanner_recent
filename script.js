class Task {
    constructor(description, deadline) {
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
        this.next = null;
    }
}

class StudyPlanner {
    constructor() {
        this.top = null;
        this.completedTop = null;
    }

    isEmpty() {
        return this.top === null;
    }

    addTask(description, deadline) {
        const newTask = new Task(description, deadline);
        if (this.isEmpty()) {
            this.top = newTask;
        } else {
            newTask.next = this.top;
            this.top = newTask;
        }
        displayMessage(`Added Task: ${description}`);
    }

    completeTask(description) {
        let temp = this.top, prev = null;
        while (temp && temp.description !== description) {
            prev = temp;
            temp = temp.next;
        }
        if (temp) {
            if (prev) prev.next = temp.next;
            else this.top = temp.next;
            temp.completed = true;
            temp.next = this.completedTop;
            this.completedTop = temp;
            displayMessage(`Completed Task: "${description}"`);
        } else {
            displayMessage(`Task "${description}" not found!`);
        }
    }

    undoCompletedTask() {
        if (!this.completedTop) return displayMessage("No completed tasks to undo!");
        const task = this.completedTop;
        this.completedTop = this.completedTop.next;
        task.next = this.top;
        this.top = task;
        task.completed = false;
        displayMessage(`Undid Task: "${task.description}"`);
    }

    deleteTask(description) {
        let temp = this.top, prev = null;
        while (temp && temp.description !== description) {
            prev = temp;
            temp = temp.next;
        }
        if (temp) {
            if (prev) prev.next = temp.next;
            else this.top = temp.next;
            displayMessage(`Deleted Task: "${description}"`);
        } else {
            displayMessage(`Task "${description}" not found!`);
        }
    }

    editTask(description, newDescription, newDeadline) {
        let temp = this.top;
        while (temp && temp.description !== description) {
            temp = temp.next;
        }
        if (temp) {
            temp.description = newDescription;
            temp.deadline = newDeadline;
            displayMessage(`Edited Task: "${newDescription}"`);
        } else {
            displayMessage(`Task "${description}" not found!`);
        }
    }

    clearAllTasks() {
        this.top = null;
        displayMessage("All tasks cleared!");
    }

    displayPlannedTasks() {
        displayTasks(this.top, "Planned Tasks");
    }

    displayCompletedTasks() {
        displayTasks(this.completedTop, "Completed Tasks");
    }

    showUpcomingDeadline() {
        if (this.isEmpty()) return displayMessage("No tasks in planner!");
        displayMessage(`Upcoming Task: ${this.top.description} - Deadline: ${this.top.deadline}`);
    }

    showProgress() {
        let completedCount = 0, pendingCount = 0;
        let temp = this.top;
        while (temp) {
            pendingCount++;
            temp = temp.next;
        }
        temp = this.completedTop;
        while (temp) {
            completedCount++;
            temp = temp.next;
        }
        const total = completedCount + pendingCount;
        const completedPercent = ((completedCount / total) * 100).toFixed(2);
        const pendingPercent = ((pendingCount / total) * 100).toFixed(2);
        displayMessage(`Completed: ${completedPercent}% - Pending: ${pendingPercent}%`);
    }
}

const planner = new StudyPlanner();

// Helper functions to manage UI
function displayMessage(message) {
    document.getElementById("output").innerText = message;
}

function displayTasks(head, title) {
    const tasksDiv = document.getElementById("tasks");
    tasksDiv.innerHTML = `<h4>${title}:</h4>`;
    let temp = head;
    while (temp) {
        tasksDiv.innerHTML += `<div>${temp.description} - Deadline: ${temp.deadline} - Completed: ${temp.completed}</div>`;
        temp = temp.next;
    }
}

// Functions to interact with StudyPlanner
function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    planner.addTask(description, deadline);
}

function completeTask() {
    const description = document.getElementById("description").value;
    planner.completeTask(description);
}

function undoCompletedTask() {
    planner.undoCompletedTask();
}

function deleteTask() {
    const description = document.getElementById("description").value;
    planner.deleteTask(description);
}

function editTask() {
    const description = document.getElementById("description").value;
    const newDesc = prompt("Enter new description:");
    const newDeadline = prompt("Enter new deadline (YYYY-MM-DD):");
    planner.editTask(description, newDesc, newDeadline);
}

function clearAllTasks() {
    planner.clearAllTasks();
}

function displayPlannedTasks() {
    planner.displayPlannedTasks();
}

function displayCompletedTasks() {
    planner.displayCompletedTasks();
}

function showUpcomingDeadline() {
    planner.showUpcomingDeadline();
}

function showProgress() {
    planner.showProgress();
}
