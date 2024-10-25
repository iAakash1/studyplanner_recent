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

    // Check if planner stack is empty
    isEmpty() {
        return this.top === null;
    }

    // Get top deadline of the planner stack
    topDeadline() {
        return this.isEmpty() ? "zzzz" : this.top.deadline;
    }

    // Add a new task to the planner stack
    addTask(description, deadline) {
        const newTask = new Task(description, deadline);
        if (this.isEmpty()) {
            this.top = newTask;
            return;
        }

        if (this.topDeadline() >= deadline) {
            newTask.next = this.top;
            this.top = newTask;
            return;
        }

        let temp = this.top.next;
        let prev = this.top;
        while (temp) {
            if (temp.deadline >= deadline) {
                newTask.next = temp;
                prev.next = newTask;
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        prev.next = newTask;
    }

    // Display tasks in the planner stack
    displayStack() {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        while (temp) {
            console.log(temp.description + "\t" + temp.deadline);
            temp = temp.next;
        }
    }

    // Display completed tasks stack
    displayCompletedStack() {
        if (this.completedTop === null) {
            console.log("No tasks completed yet!");
            return;
        }
        let temp = this.completedTop;
        while (temp) {
            console.log(temp.description + "\t" + temp.deadline);
            temp = temp.next;
        }
    }

    // Prompt near deadline task
    prompt() {
        console.log(this.top.description + "\t" + this.top.deadline);
        console.log("Complete this task on priority! Deadline approaching!");
    }

    // Push task to completed stack
    compStackPush(description, deadline) {
        const newTask = new Task(description, deadline);
        newTask.completed = true;
        if (this.completedTop === null) {
            this.completedTop = newTask;
            return;
        }
        newTask.next = this.completedTop;
        this.completedTop = newTask;
    }

    // Pop topmost task from planner stack
    popFromStack() {
        if (this.isEmpty()) {
            console.log("Stack is empty! Cannot pop any task.");
            return ""; 
        }

        const del = this.top;
        const poppedDescription = del.description;
        this.top = this.top.next;
        del.next = null; // Disconnect to help with garbage collection
        return poppedDescription;
    }

    // Complete a task from planner stack
    completeTask(name) {
        let temp = this.top;
        let prev = null;
        while (temp) {
            if (temp.description === name) {
                this.compStackPush(temp.description, temp.deadline);
                if (temp === this.top) {
                    this.popFromStack();
                } else {
                    prev.next = temp.next;
                }
                console.log("Task completed: " + name);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log("Task not found!");
    }

    // Undo a completed task
    undoCompletedTask() {
        if (this.completedTop === null) {
            console.log("No tasks completed yet!");
            return;
        }
        const del = this.completedTop;
        this.addTask(del.description, del.deadline);
        this.completedTop = this.completedTop.next;
        del.next = null; // Disconnect to help with garbage collection
    }

    // Display progress
    progress() {
        console.log("Completed tasks:");
        this.displayCompletedStack();
        console.log("Pending tasks:");
        this.displayStack();

        let completedCount = 0;
        let pendingCount = 0;
        let temp = this.completedTop;
        while (temp) {
            completedCount++;
            temp = temp.next;
        }
        temp = this.top;
        while (temp) {
            pendingCount++;
            temp = temp.next;
        }

        const total = completedCount + pendingCount;
        const completedPercent = total > 0 ? (completedCount / total) * 100 : 0;
        const pendingPercent = total > 0 ? (pendingCount / total) * 100 : 0;

        console.log("Percentage of completed tasks is: " + completedPercent);
        console.log("Percentage of pending tasks is: " + pendingPercent);
    }

    // Delete a specific task from planner
    deleteFromPlanner(description) {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        let prev = null;
        while (temp) {
            if (temp.description === description) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                console.log("Task deleted: " + description);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log("Task not found in planner.");
    }

    // Edit a task in the planner
    editFromPlanner(description, newDescription, newDeadline) {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        while (temp) {
            if (temp.description === description) {
                temp.description = newDescription;
                temp.deadline = newDeadline;
                return;
            }
            temp = temp.next;
        }
        console.log("Task not found in planner. Would you like to add this task? (Y/N):");
        // Handle add prompt separately as needed
    }

    // Display upcoming deadline task
    displayUpcomingDeadlineTask() {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        console.log("Upcoming Deadline Task:");
        console.log("Description: " + this.top.description);
        console.log("Deadline: " + this.top.deadline);
        console.log("Complete this task on priority!");
    }

    // Clear all tasks from planner
    clear() {
        while (!this.isEmpty()) {
            this.popFromStack();
        }
        console.log("All tasks cleared!");
    }
}

// Usage example (simulating user actions)

const studyPlanner = new StudyPlanner();
studyPlanner.addTask("Read Chapter 5", "2024-10-30");
studyPlanner.addTask("Finish Assignment", "2024-10-25");
studyPlanner.displayStack();
studyPlanner.completeTask("Finish Assignment");
studyPlanner.displayCompletedStack();
studyPlanner.progress();
studyPlanner.displayUpcomingDeadlineTask();
