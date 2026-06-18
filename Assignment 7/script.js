//====================DARK MODE===================

let body = document.body;
let themeToggleBtn = document.querySelector("#theme-toggle-btn");
let themeToggleIcon = themeToggleBtn.querySelector("i");
let themeToUse = localStorage.getItem("theme");
if (themeToUse == null) {
    themeToUse = "light";
    localStorage.setItem("theme", themeToUse);
}
body.setAttribute("data-theme", themeToUse);
applyTheme();

function applyTheme() {
    let currentTheme = body.dataset.theme;
    if (currentTheme === "dark") {
        body.classList.add("dark-theme");
        themeToggleIcon.classList.remove("ri-sun-fill");
        themeToggleIcon.classList.add("ri-moon-fill");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-theme");
        themeToggleIcon.classList.remove("ri-moon-fill");
        themeToggleIcon.classList.add("ri-sun-fill");
        localStorage.setItem("theme", "light");
    }
}

themeToggleBtn.addEventListener("click", () => {
    let nextTheme = body.dataset.theme == "dark" ? "light" : "dark";
    body.dataset.theme = nextTheme;
    applyTheme();
});

//=====================TASK STATE===================

let allTasks = JSON.parse(localStorage.getItem("all-tasks"));

if (allTasks == null) {
    allTasks = [];
}

let updateIndex = null;

//=====================DOM ELEMENTS====================
let filterTaskInput = document.querySelector("#search-task-input");
let taskDisplayedSection = document.querySelector(".task-section");
let noTaskPresentScreen = taskDisplayedSection.querySelector(
    "#no-task-present-section",
);
let noTaskPresentScreenHeading = noTaskPresentScreen.querySelector("h3");
let homeAddTaskBtn = document.querySelector("#add-task-btn");
let taskOperationScreen = document.querySelector(".task-opertation-form");
let closeTaskOperationScreenBtn = document.querySelector(
    "#close-task-form-btn",
);

let taskOperationForm = document.querySelector("#create-task-form");
let taskOperationHeading = taskOperationForm.querySelector("h3");
let taskNameInput = taskOperationForm.querySelector("#task-name-input");
let taskCategoryInput = taskOperationForm.querySelector("#task-category");
let taskOperationBtn = taskOperationForm.querySelector("button");

//=====================UI FUNCTIONS========================

function showTaskOperationScreen(isShowed) {
    if (isShowed) {
        taskOperationScreen.style.display = "flex";
    } else {
        taskOperationScreen.style.display = "none";
    }
}

//Displaying Task Operation Screen using Home's add task button
homeAddTaskBtn.addEventListener("click", () => {
    showTaskOperationScreen(true);
});

//Closing Task Operation screen
closeTaskOperationScreenBtn.addEventListener("click", () => {
    taskOperationForm.reset();
    setUpdateMode(false);
    showTaskOperationScreen(false);
    updateIndex = null;
});

function setUpdateMode(isUpdate) {
    if (isUpdate) {
        taskOperationHeading.innerText = "Edit Task";
        taskOperationBtn.innerText = "Update";
    } else {
        taskOperationHeading.innerText = "Create Task";
        taskOperationBtn.innerText = "Add Task";
    }
}

//Add Or Update Task
taskOperationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let taskName = taskNameInput.value.trim();
    let taskCategory = taskCategoryInput.value;
    if (taskName === "" || taskCategory === "") {
        alert("Enter Valid task name and select it's proper category!");
        taskNameInput.value = "";
        return;
    }
    let taskObj = {
        taskId: Date.now(),
        taskName,
        taskCategory,
        isComplete: false,
    };

    if (updateIndex != null && updateIndex != -1) {
        allTasks.at(updateIndex).taskName = taskObj.taskName;
        allTasks.at(updateIndex).taskCategory = taskObj.taskCategory;
        updateIndex = null;
        setUpdateMode(false);
    } else {
        allTasks.push(taskObj);
    }
    localStorage.setItem("all-tasks", JSON.stringify(allTasks));
    taskOperationForm.reset();
    showTaskOperationScreen(false);
    if (filterTaskInput.value.trim()) {
        let searchedText = filterTaskInput.value.trim().toLowerCase();

        let filteredTasks = allTasks.filter((task) =>
            task.taskName.toLowerCase().includes(searchedText),
        );

        displayTasks(filteredTasks);
    } else {
        displayTasks();
    }
});



taskDisplayedSection.addEventListener("click", (event) => {
    let taskCard = event.target.closest(".task-card");
    if(!taskCard){
        return;
    }
    let taskId = taskCard.dataset.id;
    let taskIndex = allTasks.findIndex(
        (taskItem) => taskItem.taskId == taskId,
    );
    if(taskIndex == -1){
        return;
    }
// Update the task -> showing task details in task operation form
    if (
        event.target.classList.contains("edit-btn-logo") ||
        event.target.classList.contains("edit-btn")
    ) {
        if (taskIndex !== -1) {
            showTaskOperationScreen(true);
            taskNameInput.value = allTasks.at(taskIndex).taskName;
            taskCategoryInput.value = allTasks.at(taskIndex).taskCategory;
            setUpdateMode(true);
            updateIndex = taskIndex;
        }
    }
// Delete the task 
    else if (
        event.target.classList.contains("delete-btn-logo") ||
        event.target.classList.contains("delete-btn")
    ) {
        if (taskIndex !== -1) {
            allTasks.splice(taskIndex, 1);
            localStorage.setItem("all-tasks", JSON.stringify(allTasks));
            taskCard.remove();
            toggleNoTaskPresentScreen();
        }
    }
//complete the task 
    else if(event.target.matches('input[type="checkbox"]')){
        if(taskIndex !== -1) {
            allTasks.at(taskIndex).isComplete = event.target.checked;
            localStorage.setItem("all-tasks", JSON.stringify(allTasks));
            if(filterTaskInput.value.trim() != "")
            {
                let filteredTasks = allTasks.filter(taskItem => taskItem.taskName.toLowerCase().includes(filterTaskInput.value.trim().toLowerCase()))
                displayTasks(filteredTasks);
            }else {
                displayTasks(allTasks);
            }
        }
    }
});


//Filtering the task
filterTaskInput.addEventListener("input", (event) => {
    let searchedText = filterTaskInput.value.trim();
    if (searchedText == "") {
        displayTasks(allTasks);
    } else {
        let filteredTasks = allTasks.filter((taskItem) =>
            taskItem.taskName
                .toLowerCase()
                .includes(searchedText.toLowerCase()),
        );
        displayTasks(filteredTasks, allTasks.length > 0 ? true : false);

    }
});

// Displaying the ui
displayTasks();

function toggleNoTaskPresentScreen(taskToDisplay = allTasks, isFiltered = false) {
    if (taskToDisplay.length > 0) {
        noTaskPresentScreen.style.display = "none";
        return false;
    } else {
        noTaskPresentScreen.style.display = "flex";
        if(isFiltered)
        {
            noTaskPresentScreenHeading.innerText = "No task found with that name!";
        }else
        {
            noTaskPresentScreenHeading.innerText = "It seems there are no task added yet..";
        }
        return true;
    }
}

function displayTasks(taskToDisplay = allTasks, isFiltered = false) {
    let previouslyDisplayedTasks =
        taskDisplayedSection.querySelectorAll(".task-card");
    if (previouslyDisplayedTasks.length > 0) {
        previouslyDisplayedTasks.forEach((previousTaskCard) =>
            previousTaskCard.remove(),
        );
    }
    if (toggleNoTaskPresentScreen(taskToDisplay, isFiltered)) {
        return;
    }
    taskToDisplay.forEach((taskItem) => {
        let taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        let isTaskCompleted = taskItem.isComplete;
        taskCard.setAttribute("data-id", `${taskItem.taskId}`);
        taskCard.setAttribute("data-category", `${taskItem.taskCategory}`);
        taskCard.setAttribute(
            "data-status",
            `${isTaskCompleted ? "Complete" : "Incomplete"}`,
        );
        taskCard.innerHTML = `
            <div class="task-details">
                <input type="checkbox" ${isTaskCompleted ? "checked" : ""} />
                <p ${isTaskCompleted ? 'class = "completed"' : ""}>${taskItem.taskName}</p>
            </div>

            <div class="task-actions">

                <button class="edit-btn">
                    <i class="ri-pencil-line edit-btn-logo"></i>
                </button>

                <button class="delete-btn">
                    <i class="ri-delete-bin-7-line delete-btn-logo"></i>
                </button>

            </div>
        `;
        taskDisplayedSection.append(taskCard);
    });
}

// Event Capturing and Bubbling demo
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

// --Event Bubbling
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

// input.value vs input.getAttribute("value")
// --if we take example of searchTaskInput, when we use searchTaskInput.value, it will give us the current or live data typed by the user
// --Where as if we use searchTaskInput.getAttribute("value"), it will give us initial default data defined in the original HTML. As we did not use value attribute in HTML for searchTaskInput so it will give us 'null'
