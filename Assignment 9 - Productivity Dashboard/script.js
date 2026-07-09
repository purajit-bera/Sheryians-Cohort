// ======================================
// Global Variables
// ======================================
const dashboard = document.querySelector("#dashboard");
const dashboardBackBtns = document.querySelectorAll("section .back-btn");
const currentTimeH1 = document.querySelector("#current-time");
const todayDateP = document.querySelector("#today-date");
const themeToggleCheckbox = document.querySelector("#theme-toggle-checkbox");
let appTheme = loadTheme();
// ======================================
// Application State
// ======================================
function applyTheme() {
    if(appTheme === "light") {
        document.body.classList.remove("dark");
        themeToggleCheckbox.checked = false;
    }else
    {
        document.body.classList.add("dark");
        themeToggleCheckbox.checked = true;
    }
}
applyTheme();
themeToggleCheckbox.addEventListener("change", () => {
    if(themeToggleCheckbox.checked) {
        appTheme = "dark";
    }else {
        appTheme = "light";
    }
    applyTheme();
    saveTheme(appTheme);
})

function updateClock() {
    const currentDate = getCurrentDate();
    currentTimeH1.innerText = formatClockTime(currentDate);
    todayDateP.innerText = formatDate(currentDate);
}
updateClock();
setInterval(updateClock, 1000);
// ======================================
// Utility Functions
// ======================================
function hideElement(element) {
    element.classList.add("hidden");
}
function showElement(element) {
    element.classList.remove("hidden");
}
function getCurrentDate() {
    return new Date();
}
function isCurrentHour(hourInNumber) {
    return hourInNumber === getCurrentDate().getHours();
}
function formatTime(hourInNumber) {
    const meridiem = hourInNumber < 12 ? "AM" : "PM";
    let hour;
    if (hourInNumber === 0) {
        hour = 12;
    } else if (hourInNumber <= 12) hour = hourInNumber;
    else hour = hourInNumber % 12;

    return `${hour} ${meridiem}`;
}
function formatClockTime(dateParm) {
    const date = new Date(dateParm);
    const hourIn24HrsFormat = date.getHours();
    const [hour, meridiem] = formatTime(hourIn24HrsFormat).split(" ");
    const mins = String(date.getMinutes()).padStart(2,0);
    const secs = String(date.getSeconds()).padStart(2, 0);
    return `${hour}:${mins}:${secs} ${meridiem}`;
}

function formatDate(date) {
    const fullDay = date.toLocaleDateString("en-us", {weekday:"long"});
    const day = date.getDate();
    const monthFull = date.toLocaleDateString("en-us", {month:"long"});
    const year = date.getFullYear();
    return`${fullDay}, ${monthFull} ${day}, ${year}`;
}

//----------------Local Storage
//-----Theme 
function loadTheme() {
    const theme = localStorage.getItem("app-theme");
    if(!theme) {
        localStorage.setItem("app-theme", "light");
        return "light";
    }
    return theme;
}
function saveTheme(value) {
    localStorage.setItem("app-theme", value);
}

//---To Do list
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("all-todo-list-tasks"));
    if (!tasks) {
        return [];
    }
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("all-todo-list-tasks", JSON.stringify(tasks));
}

//---Daily Planner
function loadDailyPlansDate() {
    return localStorage.getItem("dailyPlansDate");
    
}
function saveDailyPlansDate(dateValue) {
    localStorage.setItem("dailyPlansDate",dateValue);
}

function loadDailyPlans() {
    const currentDate = getCurrentDate();
    let plansDate = loadDailyPlansDate();
    const todayDate = formatDate(currentDate);
    if(plansDate == null){
        saveDailyPlansDate(todayDate);
        return [];
    }
    else if(plansDate !== todayDate) {
        saveDailyPlansDate(todayDate);
        return [];
    }
    else 
    {
        const plannerEntries =  JSON.parse(localStorage.getItem("plannerEntriesData"));
        if(!plannerEntries) {
            return [];
        }
        return plannerEntries;
    }

}
function saveDailyPlans(plannerEntries) {
    localStorage.setItem("plannerEntriesData", JSON.stringify(plannerEntries));
}

// ======================================
// Navigation
// ======================================
dashboard.addEventListener("click", (event) => {
    const featureCard = event.target.closest("article");
    if (featureCard) {
        const clickedFeature = featureCard.dataset.feature;
        hideElement(dashboard);
        showElement(document.querySelector(`#${clickedFeature}`));
    }
});

dashboardBackBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
        hideElement(event.currentTarget.closest("section"));
        showElement(dashboard);
    });
});

// ======================================
// Todo List
// ======================================
let allTasks = loadTasks();
let currentFilter = "all";
const todoListForm = document.querySelector("#todo-list-form");
const taskNameInput = document.querySelector("#task-name-input");
const taskListContainer = document.querySelector("#task-list-container");
const allFilterButtons = [
    ...document.querySelectorAll("#todo-list-filter-sec > button"),
];
const todoListFilterSec = document.querySelector("#todo-list-filter-sec");
refreshTaskList(currentFilter);

// ------Displaying tasks--------------
function displayTasks(tasks) {
    taskListContainer.innerHTML = "";
    tasks.forEach((task) => {
        taskListContainer.innerHTML += `<div class ="task-card ${task.isImportant ? "important" : ""}" data-taskId="${task.taskId}">
                                <div class="left">
                                    <input type="checkbox" class="task-complete-checkbox" ${task.isComplete ? "checked" : ""} >
                                    <p class="task-name ${task.isComplete ? "complete" : ""}">${task.taskName}</p>
                                </div>
                                <div class="right">
                                    <button class="task-important-btn"><i class="${task.isImportant ? "ri-star-fill" : "ri-star-line"}"></i></button>
                                    <button class="task-delete-btn"><i class="ri-delete-bin-7-fill"></i></button>
                                </div>
                            </div>`;
    });
}
//--------Refresh Task List-----------
function refreshTaskList(filter) {
    switch (filter) {
        case "all":
            displayTasks(allTasks);
            break;
        case "active":
            displayTasks(allTasks.filter((task) => !task.isComplete));
            break;
        case "completed":
            displayTasks(allTasks.filter((task) => task.isComplete));
            break;
        case "important":
            displayTasks(allTasks.filter((task) => task.isImportant));
            break;
    }
}
//------------Add task--------------
todoListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = taskNameInput.value.trim();
    if (taskName === "") {
        alert("Enter valid task name!");
        taskNameInput.value = "";
        return;
    }
    const newTask = {
        taskId: Date.now(),
        taskName,
        isImportant: false,
        isComplete: false,
    };
    allTasks.push(newTask);
    saveTasks(allTasks);
    refreshTaskList(currentFilter);
    taskNameInput.value = "";
});

taskListContainer.addEventListener("click", (event) => {
    const taskCard = event.target.closest(".task-card");
    if (!taskCard) {
        return;
    }
    const taskId = taskCard.getAttribute("data-taskId");
    const clickedTaskIndex = allTasks.findIndex(
        (task) => task.taskId === Number(taskId),
    );
    if (clickedTaskIndex === -1) {
        return;
    }

    //------------Complete Task-----------
    if (event.target.classList.contains("task-complete-checkbox")) {
        allTasks.at(clickedTaskIndex).isComplete =
            !allTasks.at(clickedTaskIndex).isComplete;
    }
    //----------Mark as important----------------
    else if (
        event.target.classList.contains("ri-star-line") ||
        event.target.classList.contains("ri-star-fill")
    ) {
        allTasks.at(clickedTaskIndex).isImportant =
            !allTasks.at(clickedTaskIndex).isImportant;
    }
    //--------Delete task------------
    else if (event.target.classList.contains("ri-delete-bin-7-fill")) {
        allTasks.splice(clickedTaskIndex, 1);
    }
    saveTasks(allTasks);
    refreshTaskList(currentFilter);
});

//-----------Filter Tasks--------------
todoListFilterSec.addEventListener("click", (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName.toLowerCase() === "button") {
        const previousActiveFilterButton = allFilterButtons.find(
            (filterButton) =>
                filterButton.classList.contains("active-task-filter"),
        );
        previousActiveFilterButton.classList.remove("active-task-filter");
        clickedButton.classList.add("active-task-filter");
        currentFilter = clickedButton.dataset.filter;
        refreshTaskList(currentFilter);
    }
});

// ======================================
// Daily Planner
// ======================================
const plannerCurrentDate = document.querySelector("#planner-current-date");
function updatePlannerCurrentDate() {
    const plannersDate = loadDailyPlansDate();
    if(!plannersDate){
        plannersDate = formatDate(currentDate);
    }
    plannerCurrentDate.innerText = plannersDate;
}
updatePlannerCurrentDate();
let plannerEntries = loadDailyPlans();
const plannerContainer = document.querySelector("#planner-container");
if(plannerEntries.length === 0) {
    for (let i = 0; i < 24; i++) {
        const newEntry = {
            hour: i,
            planName: "",
            isComplete: false,
        };
        plannerEntries.push(newEntry);
    }   
    saveDailyPlans(plannerEntries);
}

displayPlannerList(plannerEntries);

function getPlannerCardState(entry) {
    let state = "";
    if (entry.isComplete) {
        state = "planner-card-complete";
    } else if (isCurrentHour(entry.hour)) {
        state = "planner-card-current-hour";
    } else if (entry.planName.trim() !== "" && entry.hour < getCurrentDate().getHours()) {
        state = "planner-card-unfinished";
    }
    return state;
}
function refreshPlannerCard(plannerCard, plannerEntry) {
    plannerCard.classList.remove("planner-card-complete", "planner-card-current-hour", "planner-card-unfinished");
    const state = getPlannerCardState(plannerEntry);
    if(state !== "")
        plannerCard.classList.add(state);
}
function adjustPlannerTextareaHeights(plannerTextArea) {
        plannerTextArea.style.height = "auto";
        plannerTextArea.style.height = `${plannerTextArea.scrollHeight}px`;
}
//--------------Displaying all Planner--------------
function displayPlannerList(plannerList) {
    plannerContainer.innerHTML = "";
    plannerList.forEach((entry) => {
        plannerContainer.innerHTML += `<article class="planner-card ${getPlannerCardState(entry)}" data-hour="${entry.hour}">
                        <div class="planner-left">
                            <h2 class="plan-time ${isCurrentHour(entry.hour) ? "plan-time-current-hour" : ""}">
                            ${formatTime(entry.hour)}
                            </h2>
                        </div>
                        <div class="planner-mid">
                            <textarea
                                rows="1"
                                class="plan-name"
                                placeholder="Plan Something..."
                            >${entry.planName}</textarea>
                        </div>

                        <div class="planner-right">
                            <input
                                type="checkbox"
                                class="plan-complete-checkbox"
                                ${entry.isComplete ? "checked" : ""}
                            />
                        </div>
                    </article>`;
        const addedPlannerCard = plannerContainer.lastElementChild;
        const plannerTextArea = addedPlannerCard.querySelector(".plan-name");
        adjustPlannerTextareaHeights(plannerTextArea);
    });
}

//--------------Editing Plan name---------------
plannerContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("plan-name")) {
        const plannerCard = event.target.closest(".planner-card");
        const hour = plannerCard.dataset.hour;
        const inputValue = event.target.value.trim();
        const plannerEntry = plannerEntries.find(
            (entry) => entry.hour === Number(hour),
        );
        plannerEntry.planName = inputValue;
        adjustPlannerTextareaHeights(event.target);
        saveDailyPlans(plannerEntries);
    }
});
plannerContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("plan-name")) {
        const plannerCard = event.target.closest(".planner-card");
        const hour = plannerCard.dataset.hour;
        const plannerEntry = plannerEntries.find(
            (entry) => entry.hour === Number(hour),
        );
        refreshPlannerCard(plannerCard, plannerEntry);
    }
});

//------------Completing a plan----------------------
plannerContainer.addEventListener("click", (event)=> {
    if (event.target.classList.contains("plan-complete-checkbox")) {
        const plannerCard = event.target.closest(".planner-card");
        const hour = plannerCard.dataset.hour;
        const plannerEntry = plannerEntries.find(
                (entry) => entry.hour === Number(hour),
            );
        plannerEntry.isComplete = !plannerEntry.isComplete;
        refreshPlannerCard(plannerCard, plannerEntry);
        saveDailyPlans(plannerEntries);
    }
});
// ======================================
// Daily Goals
// ======================================

// ======================================
// Pomodoro Timer
// ======================================

// ======================================
// Motivation Quotes
// ======================================

// ======================================
// Weather
// ======================================

// ======================================
// Date & Time
// ======================================

// ======================================
// Theme
// ======================================

// ======================================
// Initialization
// ======================================

// Starts the application
