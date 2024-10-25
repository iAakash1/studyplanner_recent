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

    // Get deadline of top task in planner stack
    topDeadline() {
        return this.isEmpty() ? "zzzz" : this.top.deadline;
    }

    // Add task to planner stack
    addTask(desc, dl) {
        const newTask = new Task(desc, dl);
        if (this.isEmpty() || this.topDeadline() >= dl) {
            newTask.next = this.top;
            this.top = newTask;
            return;
        }

        let temp = this.top.next;
        let prev = this.top;
        while (temp && temp.deadline < dl) {
            prev = temp;
            temp = temp.next;
        }
        prev.next = newTask;
        newTask.next = temp;
    }

    // Display tasks in planner stack
    displayStack() {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        while (temp) {
            console.log(`${temp.description}\t${temp.deadline}`);
            temp = temp.next;
        }
    }

    // Display completed tasks
    displayCompletedStack() {
        if (!this.completedTop) {
            console.log("No tasks completed yet!");
            return;
        }
        let temp = this.completedTop;
        while (temp) {
            console.log(`${temp.description}\t${temp.deadline}`);
            temp = temp.next;
        }
    }

    // Mark a task as completed
    completeTask(desc) {
        let temp = this.top;
        let prev = null;

        while (temp) {
            if (temp.description === desc) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                this.compStackPush(temp.description, temp.deadline);
                console.log(`Task completed: ${desc}`);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log("Task not found!");
    }

    // Add completed task to completed stack
    compStackPush(desc, dl) {
        const newTask = new Task(desc, dl);
        newTask.completed = true;
        newTask.next = this.completedTop;
        this.completedTop = newTask;
    }

    // Undo the last completed task
    undoCompletedTask() {
        if (!this.completedTop) {
            console.log("No tasks completed yet!");
            return;
        }
        const del = this.completedTop;
        this.addTask(del.description, del.deadline);
        this.completedTop = this.completedTop.next;
        console.log(`Task undone: ${del.description}`);
    }

    // Delete a specific task from the planner stack
    deleteFromPlanner(desc) {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        let prev = null;

        while (temp) {
            if (temp.description === desc) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                console.log(`Task ${desc} deleted.`);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log(`Task "${desc}" not found.`);
    }

    // Clear all tasks from the planner stack
    clear() {
        this.top = null;
        console.log("All tasks cleared!");
    }

    // Display the task with the nearest deadline
    displayUpcomingDeadlineTask() {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
        } else {
            console.log("Upcoming Deadline Task:");
            console.log(`Description: ${this.top.description}`);
            console.log(`Deadline: ${this.top.deadline}`);
            console.log("Complete this task on priority!");
        }
    }
}

// Interactive prompt simulation
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    const planner = new StudyPlanner();

    function showMenu() {
        console.log("\nChoose an option:");
        console.log("1. Add task");
        console.log("2. Complete task");
        console.log("3. Undo last completed task");
        console.log("4. Display all tasks");
        console.log("5. Display completed tasks");
        console.log("6. Display upcoming deadline task");
        console.log("7. Delete a task");
        console.log("8. Clear all tasks");
        console.log("9. Exit");

        readline.question("Enter your choice: ", (choice) => {
            switch (choice) {
                case "1":
                    readline.question("Enter task description: ", (desc) => {
                        readline.question("Enter deadline (YYYY-MM-DD): ", (dl) => {
                            planner.addTask(desc, dl);
                            console.log("Task added.");
                            showMenu();
                        });
                    });
                    break;
                case "2":
                    readline.question("Enter the description of the task to complete: ", (desc) => {
                        planner.completeTask(desc);
                        showMenu();
                    });
                    break;
                case "3":
                    planner.undoCompletedTask();
                    showMenu();
                    break;
                case "4":
                    planner.displayStack();
                    showMenu();
                    break;
                case "5":
                    planner.displayCompletedStack();
                    showMenu();
                    break;
                case "6":
                    planner.displayUpcomingDeadlineTask();
                    showMenu();
                    break;
                case "7":
                    readline.question("Enter the description of the task to delete: ", (desc) => {
                        planner.deleteFromPlanner(desc);
                        showMenu();
                    });
                    break;
                case "8":
                    planner.clear();
                    showMenu();
                    break;
                case "9":
                    console.log("Exiting...");
                    readline.close();
                    break;
                default:
                    console.log("Invalid choice, please try again.");
                    showMenu();
            }
        });
    }

    showMenu();
}

main();
