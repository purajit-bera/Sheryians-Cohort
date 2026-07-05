
//-Login Screen
const loginScreen = document.querySelector("#login-screen");
const showLoginScreenOption = document.querySelector("#show-login");
const loginUsernameInput = document.querySelector("#login-username");
const loginPasswordInput = document.querySelector("#login-password");
const loginForm = document.querySelector("#login-form");
//-Register Screen
const registerScreen = document.querySelector("#register-screen");
const showRegisterScreenOption = document.querySelector("#show-register");
const registerForm = document.querySelector("#register-form");
const registerUserNameInput = document.querySelector("#register-username");
const registerPasswordInput = document.querySelector("#register-password");

//-Main Screen
const mainScreen = document.querySelector("main");
const logoutBtn = document.querySelector("#logout-btn");
const usernameDisplaySection = document.querySelector("#username-display")

//Navigation bar
const displayDashboardBtn = document.querySelector("#display-dashboard-btn");
const displaySettingsBtn = document.querySelector("#display-settings-btn");
const addTransactionBtn = document.querySelector("#add-transaction-btn");
//Dashboard
const dashboardScreen = document.querySelector("#dashboard");
const darkModeToggleBtn = document.querySelector("#dark-mode-toggle-btn");

//--Add Transaction
const addTransactionScreen = document.querySelector("#add-transaction-screen");
const closeAddTransScreenBtn = document.querySelector("#close-add-trans-btn");

//Settings
const settingsScreen = document.querySelector("#settings");


// Login Screen and Register Screen Switching
function showLoginScreen() {
    registerScreen.style.display = "none";
    mainScreen.style.display = "none";
    loginScreen.style.display = "flex";
}

function showRegisterScreen() {
    loginScreen.style.display = "none";
    registerScreen.style.display = "flex";
}

showRegisterScreenOption.addEventListener("click", ()=> {
    showRegisterScreen();
});
showLoginScreenOption.addEventListener("click", () => {
    showLoginScreen();
});

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(currentUser === null) {
    showLoginScreen();
}
else {
    displayMainScreen(currentUser);
}

function updateCurrentUserInLocalStorage(user) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function displayMainScreen(user) {
    //Changing the theme
    if(currentUser.theme === "light") {
        changeTheme("light");
        darkModeToggleBtn.checked = false;
    }else {
        changeTheme("dark");
        darkModeToggleBtn.checked = true;
    }
    loginScreen.style.display = "none";
    mainScreen.style.display = "grid";
    usernameDisplaySection.textContent = user.username;
}
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
if(allUsers === null) {
    allUsers = [];
}
//Login Screen Authenticate
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameValue = loginUsernameInput.value.trim();
    const passwordValue = loginPasswordInput.value.trim();
    if(usernameValue === "" || passwordValue === "") {
        alert("Invalid value provided for username or password");
    }else 
    {
        const presentUser = allUsers.find(user => user.username === usernameValue && user.password === passwordValue);
        if(presentUser) {
            displayMainScreen(presentUser);
            currentUser = presentUser;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }else {
            alert("No user found with given username and password");
        }
    }
    
    loginPasswordInput.value = "";
    loginUsernameInput.value = "";
});
//Register Screen 
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameValue = registerUserNameInput.value.trim();
    const passwordValue = registerPasswordInput.value.trim();
    if(usernameValue === "" || passwordValue === "") {
        alert("Invalid value provided for username or password");
    }else 
    {
        const presentUser = allUsers.find(user => user.username === usernameValue);
        if(presentUser) {
            alert("Same username is already present, use different one");
        }
        else {
            const newUser = {
                username: usernameValue,
                password: passwordValue,
                theme: "light",
                allTransactions: new Array()
            };
            allUsers.push(newUser);
            localStorage.setItem("allUsers", JSON.stringify(allUsers));
            console.log(allUsers);
            showLoginScreen();
        }
    }
    registerUserNameInput.value = "";
    registerPasswordInput.value = "";
})


// Loging out
logoutBtn.addEventListener("click", () => {
    mainScreen.style.display = "none";
    loginScreen.style.display = "flex";
    currentUser = null;
    localStorage.setItem("currentUser", JSON.stringify(null));
})

//Switching Dashboard and Settings Screen
displayDashboardBtn.addEventListener("click", () => {
    if(!displayDashboardBtn.classList.contains("nav-item-active")) {
        displayDashboardBtn.classList.add("nav-item-active");
        displaySettingsBtn.classList.remove("nav-item-active");
        dashboardScreen.style.display = "flex";
        settingsScreen.style.display = "none";
    } 
});

displaySettingsBtn.addEventListener("click", () => {
    if(!displaySettingsBtn.classList.contains("nav-item-active")) {
        displaySettingsBtn.classList.add("nav-item-active");
        displayDashboardBtn.classList.remove("nav-item-active");
        settingsScreen.style.display = "block";
        dashboardScreen.style.display = "none";
    } 
});

//Changing the theme
function changeTheme(themeType) {
    if(themeType === "light") {
        document.body.classList.remove("dark");
    }else{
        document.body.classList.add("dark");
    }
}

darkModeToggleBtn.addEventListener("change", ()=> {

    if(darkModeToggleBtn.checked) {
            console.log("dark");
        changeTheme("dark");
        if(currentUser !== null) {
            currentUser.theme = "dark";
        }
    }else {
        changeTheme("light");
        if(currentUser !== null) {
            currentUser.theme = "light";
        }
    }
    updateCurrentUserInLocalStorage(currentUser);
});



//Add Transaction
const transTypeInput = document.querySelector("#trans-type-input");
const transDesInput = document.querySelector("#trans-des-input");
const transAmountInput = document.querySelector("#trans-amount-input");
const transDateInput = document.querySelector("#trans-date");
const transCategoryInput = document.querySelector("#trans-category-input");
const transAddForm = document.querySelector("#add-transaction-form");


function closeAddTransScreen() {
    addTransactionScreen.style.display = "none";
}
addTransactionBtn.addEventListener("click", ()=> {
    addTransactionScreen.style.display = "flex";
    transDateInput.valueAsDate = new Date();
});
closeAddTransScreenBtn.addEventListener("click", ()=> {
    closeAddTransScreen();
});

transAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const transactionType = transTypeInput.value;
    const transactionDescription = transDesInput.value;
    const tranasactionAmount = transAmountInput.value;
    const transactionDate = transDateInput.valueAsDate;
    const transactionCategory = transCategoryInput.value;
    
    const newTransaction = {
        transactionType,
        transactionDescription,
        tranasactionAmount,
        transactionDate,
        transactionCategory
    };
    if(!currentUser.allTransactions) {
        currentUser.allTransactions = [];
    }
    currentUser.allTransactions.push(newTransaction);
    console.log(currentUser);
    console.log(allUsers);

    transTypeInput.value = "expense";
})

const ctx = document.getElementById("cashFlowChart");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Income vs Expenses"],
        datasets: [
            {
                label: "Income",
                data: [300, 400, 500],
                backgroundColor: "#1F6F3D",
                borderRadius: 6,
            },
            {
                label: "Expenses",
                data: [0],
                backgroundColor: "#A61D1D",
                borderRadius: 6,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top",
            },
        },

        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});