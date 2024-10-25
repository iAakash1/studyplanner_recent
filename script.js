// script.js
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

    topDeadline() {
        return this.isEmpty() ? "zzzz" : this.top.deadline;
    }

    addTask(description, deadline) {
        const newTask = new Task(description, deadline);
        if (this.isEmpty() || this.topDeadline() >= deadline) {
            newTask.next = this.top;
            this.top = newTask;
            return;
        }

        let temp = this.top.next;
        let prev = this.top;
        while (temp && temp.deadline < deadline) {
            prev = temp;
            temp = temp.next;
        }
        prev.next = newTask;
        newTask.next = temp;
    }

    completeTask(description) {
        let temp = this.top;
        let prev = null;

        while (temp) {
            if (temp.description === description) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                this.pushCompleted(temp.description, temp.deadline);
                return `Task completed: ${description}`;
            }
            prev = temp;
            temp = temp.next;
        }
        return `Task not found!`;
    }

    pushCompleted(description, deadline) {
        const newTask = new Task(description, deadline);
        newTask.completed = true;
        newTask.next = this.completedTop;
        this.completedTop = newTask;
    }

    undoCompletedTask() {
        if (!this.completedTop) return "No tasks completed yet!";
        const undoneTask = this.completedTop;
        this.addTask(undoneTask.description, undoneTask.deadline);
        this.completedTop = this.completedTop.next;
        return `Task undone: ${undoneTask.description}`;
    }

    displayPlannedTasks() {
        let temp = this.top;
        if (this.isEmpty()) return "No tasks planned!";
        let taskList = "";
        while (temp) {
            taskList += `Description: ${temp.description}, Deadline: ${temp.deadline}\n`;
            temp = temp.next;
        }
        return taskList;
    }

    displayCompletedTasks() {
        let temp = this.completedTop;
        if (!temp) return "No tasks completed yet!";
        let taskList = "";
        while (temp) {
            taskList += `Description: ${temp.description}, Deadline: ${temp.deadline}\n`;
            temp = temp.next;
        }
        return taskList;
    }

    deleteTask(description) {
        if (this.isEmpty()) return "No tasks planned!";
        let temp = this.top;
        let prev = null;

        while (temp) {
            if (temp.description === description) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                return `Task "${description}" deleted.`;
            }
            prev = temp;
            temp = temp.next;
        }
        return `Task "${description}" not found.`;
    }

    clearAllTasks() {
        this.top = null;
        return "All tasks cleared!";
    }

    showUpcomingDeadline() {
        if (this.isEmpty()) return "No tasks planned!";
        return `Upcoming Task: ${this.top.description}, Deadline: ${this.top.deadline}`;
    }
}

// Creating the StudyPlanner instance
const planner = new StudyPlanner();

// Connecting functions to HTML elements
function addTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    if (description && deadline) {
        planner.addTask(description, deadline);
        document.getElementById("output").innerText = `Task added: ${description}`;
        displayPlannedTasks();
    }
}

function completeTask() {
    const description = document.getElementById("description").value;
    const result = planner.completeTask(description);
    document.getElementById("output").innerText = result;
}
