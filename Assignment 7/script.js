//====================DARK MODE===================

let themeToggleBtn = document.querySelector("#theme-toggle-btn");
let themeToggleIcon = themeToggleBtn.querySelector("i");

themeToggleBtn.addEventListener("click", () => {
    if (document.body.classList.toggle("dark-theme")) {
        themeToggleIcon.classList.remove("ri-sun-fill");
        themeToggleIcon.classList.add("ri-moon-fill");
    } else {
        themeToggleIcon.classList.remove("ri-moon-fill");
        themeToggleIcon.classList.add("ri-sun-fill");
    }
});

//=====================TASK STATE===================

let allTasks = [];
let updateIndex = null;

//=====================DOM ELEMENTS====================

let taskSection = document.querySelector(".task-section");

let addTaskBtn = document.querySelector("#add-task-btn");

let taskOpertationForm = document.querySelector(".task-opertation-form");

let closeTaskFormBtn = document.querySelector("#close-task-form-btn");

let taskForm = document.querySelector("#create-task-form");
let taskHeading = taskForm.querySelector("h3");
let taskInput = taskForm.querySelector("#task-name-input");
let taskCategoryInput = taskForm.querySelector("#task-category");
let taskOperationBtn = taskForm.querySelector("button");

//=====================UI FUNCTIONS========================

function ui(taskToDisplay = allTasks) {
    taskSection.innerHTML = "";

    taskToDisplay.forEach((task, index) => {
        let taskCard = document.createElement("div");

        taskCard.classList.add("task-card");
        let isTaskCompleted = task.isComplete;
        taskCard.setAttribute("data-id", `${task.taskId}`);
        taskCard.setAttribute("data-category", `${task.taskCategory}`);
        taskCard.setAttribute(
            "data-status",
            `${isTaskCompleted ? "Complete" : "Incomplete"}`,
        );
        taskCard.innerHTML = `
            <div class="task-details">
                <input type="checkbox" ${isTaskCompleted ? "checked" : ""} />
                <p class ="${isTaskCompleted ? "completed" : ""}">${task.taskName}</p>
            </div>

            <div class="task-actions">

                <button onclick="updateTask(${task.taskId})" class="edit-btn">
                    <i class="ri-pencil-line"></i>
                </button>

                <button class="delete-btn">
                    <i class="ri-delete-bin-7-line delete-btn-logo"></i>
                </button>

            </div>
        `;

        taskSection.append(taskCard);
    });
}

function closeTaskOperatorForm() {
    taskOpertationForm.style.display = "none";

    taskForm.reset();

    if (updateIndex != null && updateIndex != -1) {
        taskHeading.innerText = "Create Task";
        taskOperationBtn.innerText = "Add Task";

        updateIndex = null;
    }
}

//=====================EVENTS===============

addTaskBtn.addEventListener("click", () => {
    taskOpertationForm.style.display = "flex";
});

closeTaskFormBtn.addEventListener("click", () => {
    closeTaskOperatorForm();
});

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let taskName = taskInput.value;
    let taskCategory = taskCategoryInput.value;

    if (taskName.trim() === "" || taskCategory.trim() === "") {
        alert("Enter proper name for task and select the category of it...");

        return;
    }

    let taskObj = {
        taskId: Date.now(),
        taskName,
        taskCategory,
        isComplete: false,
    };

    if (updateIndex != null && updateIndex != -1) {
        allTasks[updateIndex].taskName = taskObj.taskName;
        allTasks[updateIndex].taskCategory = taskObj.taskCategory;
    } else {
        allTasks.push(taskObj);
    }

    taskForm.reset();

    ui();

    closeTaskOperatorForm();
});

taskSection.addEventListener("click", (event) => {
    if (
        event.target.classList.contains("delete-btn-logo") ||
        event.target.classList.contains("delete-btn")
    ) {
        let deletedTaskCard = event.target.closest(".task-card");

        let deletedTaskId = deletedTaskCard.dataset.id;

        let deletedTaskIndex = allTasks.findIndex(
            (task) => task.taskid === deletedTaskId,
        );

        allTasks.splice(deletedTaskIndex, 1);

        deletedTaskCard.remove();
    }
});

//=====================TASK OPERATIONS=======================

function updateTask(taskId) {
    console.log(allTasks);

    let task = allTasks.find((taskItem) => taskItem.taskId === taskId);

    updateIndex = allTasks.findIndex((taskItem) => taskItem.taskId === taskId);

    taskForm[0].value = task.taskName;
    taskForm[1].value = task.taskCategory;

    taskOpertationForm.style.display = "flex";

    taskHeading.innerText = "Update Task";
    taskOperationBtn.innerText = "Update Task";
}

//====================COMPLETE TASK=================
taskSection.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        let taskCard = event.target.closest(".task-card");
        let taskCardId = taskCard.dataset.id;
        console.log(taskCardId);
        console.log(allTasks);
        let taskObj = allTasks.find(
            (taskItem) => taskItem.taskId == taskCardId,
        );
        taskObj.isComplete = event.target.toggleAttribute("checked");
        // ui();
    }
});

//=====================Filter Task===================
let searchTaskInput = document.querySelector("#search-task-input");

searchTaskInput.addEventListener("input", () => {
    let displayedTask;
    let searchedValue = searchTaskInput.value.trim();
    if (searchedValue === "") {
        displayedTask = [...allTasks];
    } else {
        displayedTask = allTasks.filter((taskItem) =>
            taskItem.taskName.toLowerCase().includes(searchedValue),
        );
    }
    ui(displayedTask);
});

//Event Capturing and Bubbling demo
//--Event Capturing
document.body.addEventListener(
    "click",
    () => {
        console.log("Body is Triggered");
    },
    true,
);

document.querySelector("main").addEventListener(
    "click",
    () => {
        console.log("Main is Triggered");
    },
    true,
);

document.querySelector("#top-section").addEventListener(
    "click",
    () => {
        console.log("Top Section is triggered!");
    },
    true,
);

themeToggleBtn.addEventListener(
    "click",
    () => {
        console.log("Theme Toggle button is triggered");
    },
    true,
);

//--Event Bubbling
document.body.addEventListener("click", () => {
    console.log("Body is Triggered");
});

document.querySelector("main").addEventListener("click", () => {
    console.log("Main is Triggered");
});

document.querySelector("#top-section").addEventListener("click", () => {
    console.log("Top Section is triggered!");
});

themeToggleBtn.addEventListener("click", () => {
    console.log("Theme Toggle button is triggered");
});

//input.value vs input.getAttribute("value")
//--if we take example of searchTaskInput, when we use searchTaskInput.value, it will give us the current or live data typed by the user
//--Where as if we use searchTaskInput.getAttribute("value"), it will give us initial default data defined in the original HTML. As we did not use value attribute in HTML for searchTaskInput so it will give us 'null'
