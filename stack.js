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

    // ... [Other methods as previously defined] ...

    // Method to interact with the user for task management
    userInteraction() {
        let choice;
        do {
            choice = prompt(
                `Enter your choice:\n
                1: Add New Task\n
                2: Complete Task\n
                3: Undo Last Completed Task\n
                4: Show Progress\n
                5: Display Planned Tasks\n
                6: Display Completed Tasks\n
                7: Delete Specific Task\n
                8: Edit Task\n
                9: Clear All Tasks\n
                10: Show Upcoming Deadline Task\n
                0: Exit`
            );

            switch (choice) {
                case '1':
                    this.addTask(
                        prompt("Enter task description:"),
                        prompt("Enter task deadline (YYYY-MM-DD):")
                    );
                    break;
                case '2':
                    this.completeTask(prompt("Enter the description of the completed task:"));
                    break;
                case '3':
                    this.undoCompletedTask();
                    break;
                case '4':
                    this.progress();
                    break;
                case '5':
                    this.displayStack();
                    break;
                case '6':
                    this.displayCompletedStack();
                    break;
                case '7':
                    this.deleteFromPlanner(prompt("Enter the description of the task to delete:"));
                    break;
                case '8':
                    this.editFromPlanner(
                        prompt("Enter the description of the task to edit:"),
                        prompt("Enter new description:"),
                        prompt("Enter new deadline (YYYY-MM-DD):")
                    );
                    break;
                case '9':
                    this.clear();
                    break;
                case '10':
                    this.displayUpcomingDeadlineTask();
                    break;
                case '0':
                    console.log("Exiting...");
                    break;
                default:
                    console.log("Invalid choice. Try again.");
            }
        } while (choice !== '0');
    }
}

// Initialize and run the study planner with user input
const studyPlanner = new StudyPlanner();
studyPlanner.userInteraction();
