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

    // Planner stack
    isEmpty() {
        return this.top === null;
    }

    // Planner stack - Top deadline
    topDeadline() {
        if (this.isEmpty()) return "zzzz";
        return this.top.deadline;
    }

    // Planner stack - Adding new task to planner
    addTask(description, deadline) {
        const newTask = new Task(description, deadline);
        if (this.isEmpty()) {
            this.top = newTask;
            return;
        }
        const topDeadline = this.topDeadline();
        if (topDeadline >= deadline) {
            newTask.next = this.top;
            this.top = newTask;
            return;
        }

        let temp = this.top.next;
        let prev = this.top;
        while (temp) {
            if (temp.deadline >= deadline) {
                newTask.next = temp.next;
                prev.next = newTask.next;
                return;
            }
            temp = temp.next;
            prev = prev.next;
        }
        prev.next = newTask;
        newTask.next = null;
    }

    // Planner stack - Displaying the study planner
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

    // Completed stack - Displaying completed tasks
    displayCompletedStack() {
        if (this.completedTop === null) {
            console.log("No tasks completed yet!");
            return;
        }
        let temp = this.completedTop;
        while (temp) {
            console.log(`${temp.description}\t${temp.deadline}`);
            temp = temp.next;
        }
    }

    // Planner stack - Prompting the near deadline task
    prompt() {
        console.log(`${this.top.description}\t${this.top.deadline}`);
        console.log("Complete this task on priority! Deadline approaching!");
    }

    // Completed stack - Adding a task to completed stack
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

    // Planner stack - Popping topmost task
    popFromStack() {
        if (this.isEmpty()) {
            console.log("Stack is empty! Cannot pop any task.");
            return "";
        }
        const del = this.top;
        const poppedDescription = del.description;
        this.top = this.top.next;
        return poppedDescription;
    }

    // Completing a task
    completeTask() {
        const name = prompt("Enter task completed: ");
        let temp = this.top;
        let prev = null;

        while (temp) {
            if (temp.description === name) {
                if (temp === this.top) {
                    this.compStackPush(temp.description, temp.deadline);
                    const poppedDescription = this.popFromStack();
                    console.log(`Task completed: ${poppedDescription}`);
                    return;
                } else {
                    prev.next = temp.next;
                    this.compStackPush(temp.description, temp.deadline);
                    console.log(`Task completed: ${name}`);
                    return;
                }
            }
            prev = temp;
            temp = temp.next;
        }
        console.log("Task not found!");
    }

    // Undo the most recent completed task
    undoCompletedTask() {
        if (this.completedTop === null) {
            console.log("No tasks completed yet!");
            return;
        }
        const del = this.completedTop;
        this.addTask(del.description, del.deadline);
        this.completedTop = this.completedTop.next;
    }

    // Checking progress
    progress() {
        console.log("Completed tasks:");
        this.displayCompletedStack();
        console.log("Pending tasks:");
        this.displayStack();

        let completedCount = 0;
        let pendingCount = 0;
        let compTemp = this.completedTop;
        let planTemp = this.top;

        while (compTemp) {
            completedCount++;
            compTemp = compTemp.next;
        }

        while (planTemp) {
            pendingCount++;
            planTemp = planTemp.next;
        }

        const total = completedCount + pendingCount;
        const completedPercentage = (completedCount / total) * 100;
        const pendingPercentage = (pendingCount / total) * 100;

        console.log(`Percentage of completed tasks is: ${completedPercentage}%`);
        console.log(`Percentage of pending tasks is: ${pendingPercentage}%`);
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
                    return;
                } else {
                    prev.next = temp.next;
                    return;
                }
            }
            prev = temp;
            temp = temp.next;
        }
        console.log(`The task entered "${description}" is not present in the study planner.`);
    }

    // Edit a task
    editFromPlanner(description) {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }

        let temp = this.top;
        while (temp) {
            if (temp.description === description) {
                temp.description = prompt("Enter new description: ");
                temp.deadline = prompt("Enter new deadline: ");
                return;
            }
            temp = temp.next;
        }
        console.log(`The task "${description}" is not present in the study planner. Can't edit it.`);
    }

    // Display the upcoming deadline task
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

    // Clear all tasks from planner
    clear() {
        while (!this.isEmpty()) {
            this.popFromStack();
        }
        console.log("All tasks cleared!");
    }
}

// Example usage
const s1 = new StudyPlanner();
let choice;
let continueChoice;

do {
    choice = prompt("Enter choice (1: Add Task, 2: Complete Task, 3: Undo Completed, 4: Show Progress, 5: Display Tasks, 6: Display Completed, 7: Delete Task, 8: Edit Task, 9: Clear Tasks, 10: Display Upcoming Task): ");
    switch (parseInt(choice)) {
        case 1:
            do {
                const desc = prompt("Enter task description: ");
                const dl = prompt("Enter task deadline (YYYY-MM-DD): ");
                s1.addTask(desc, dl);
                continueChoice = prompt("Do you want to add another task? (Y/N): ");
            } while (continueChoice === 'Y' || continueChoice === 'y');
            break;
        case 2:
            s1.completeTask();
            break;
        case 3:
            s1.undoCompletedTask();
            break;
        case 4:
            s1.progress();
            break;
        case 5:
            s1.displayStack();
            break;
        case 6:
            s1.displayCompletedStack();
            break;
        case 7:
            const deleteDesc = prompt("Enter description of task to delete: ");
            s1.deleteFromPlanner(deleteDesc);
            break;
        case 8:
            const editDesc = prompt("Enter description of task to edit: ");
            s1.editFromPlanner(editDesc);
            break;
        case 9:
            s1.clear();
            break;
        case 10:
            s1.displayUpcomingDeadlineTask();
            break;
        default:
            console.log("Invalid choice! Please try again.");
    }

    continueChoice = prompt("Do you want to perform another action? (Y/N): ");
} while (continueChoice === 'Y' || continueChoice === 'y');
