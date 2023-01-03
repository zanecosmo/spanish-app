const loginInputs = {
    username:  {
        element: document.querySelector(".username-input.login"),
        validationMessage: null
    },
    password: {
        element: document.querySelector(".password-input.login"),
        validationMessage: null
    }
};

const state = { accessToken: null };

const createAccountInputs = {
    username:  {
        element: document.querySelector(".username-input.create-account"),
        validationMessage: null
    },
    password: {
        element: document.querySelector(".password-input.create-account"),
        validationMessage: null
    }
};

const hasNoCharacters = (text) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") return false;
    };
    return true;
};

const makeVisible = (classNames) => {
    const element = document.querySelector(`${classNames}`);
    element.classList.remove("invisible");
};

const makeInvisible = (classNames) => {
    const element = document.querySelector(`${classNames}`);
    if (element.classList.contains("invisible")) return;
    element.classList.add("invisible");
};

const appendValidationMessages = (classNames, inputs) => {
    let counter = 1;
    for (let input in inputs) {
        const element = document.querySelector(`.validation-${counter}${classNames}`);
        element.textContent = inputs[input].validationMessage;
        counter++;
    };
};

const extractUserInfo = (inputs) => {
    const user = {
        id: undefined,
        username: "",
        password: "",
        role: "USER"
    };

    for (let input in inputs) {
        if (inputs[input].element === null) {
            inputs[input].validationMessage = `DOM does not contain ${input}-input element`;
            continue;
        };
        
        if (inputs[input].element.value.length === 0) {
            inputs[input].validationMessage = `must enter a value for the ${input} input`;
            continue;
        };

        if (hasNoCharacters(inputs[input].element.value)) {
            inputs[input].validationMessage = `${input} input must contain characters`;
            continue;
        };

        inputs[input].validationMessage = null;
        user[input] = inputs[input].element.value;
    };

    return user;
};

const loadHomepage = () => {
    makeInvisible(".entry-screen");
    makeVisible(".homepage");
};

const unloadHomepage = () => {
    makeVisible(".entry-screen");
    makeInvisible(".homepage");
};

const attemptLogin = async () => {
    const user = extractUserInfo(loginInputs);
    
    if (loginInputs.password.validationMessage || loginInputs.username.validationMessage) {
        console.log(loginInputs);
        appendValidationMessages(".login", loginInputs);
        return makeVisible(".validation-messages.login");
    };

    if (user.username === "" || user.password === "") {
        throw new Error("USERNAME OR PASSWORD VALIDATED INCORRECTLY");
    };

    makeInvisible(".validation-messages.login");

    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
    });

    const jsonMessage = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    };

    const serverURL = "http://localhost:8000/login";

    const response = await fetch(serverURL, jsonMessage);
    const body = await response.json();

    if (response.status === 403) {
        const responseMessage = document.querySelector(".response-error");
        responseMessage.textContent = body.message;
        return;
    };

    state.accessToken = body.accessToken;

    loadHomepage();
};

const attemptCreateAccount = async () => {
    const user = extractUserInfo(createAccountInputs);
    console.log(createAccountInputs.password.validationMessage);
    
    if (createAccountInputs.password.validationMessage || createAccountInputs.username.validationMessage) {
        appendValidationMessages(".create-account", createAccountInputs);
        return makeVisible(".validation-messages.create-account")
    };
    if (user.username === "" || user.password === "") {
        throw new Error("USERNAME OR PASSWORD VALIDATED INCORRECTLY");
    };

    makeInvisible(".validation-messages.login");

    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
    });

    const jsonMessage = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    };

    const serverURL = "http://localhost:8000/create-account";

    const response = await fetch(serverURL, jsonMessage);
    const body = await response.json();

    if (response.status === 403) {
        const responseMessage = document.querySelector(".response-error");
        responseMessage.textContent = body.message;
        return;
    };

    state.accessToken = body.accessToken;

    loadHomepage();
};

const attemptLogout = async () => {
    const headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${state.accessToken}`
    });

    const jsonMessage = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ data: null })
    };

    const serverURL = "http://localhost:8000/logout";

    const response = await fetch(serverURL, jsonMessage);
    const body = await response.json();

    if (response.status === 403) {
        const responseMessage = document.querySelector(".response-error");
        responseMessage.textContent = body.message;
        return;
    };

    unloadHomepage();
};

const loginButton = document.querySelector(".submit-button.login");
const createAccountButton = document.querySelector(".submit-button.create-account");
const logoutButton = document.querySelector(".submit-button.logout");

if (loginButton === null) throw new Error("DOM DOES NOT CONTAIN LOGIN BUTTON ELEMENT");
if (createAccountButton === null) throw new Error("DOM DOES NOT CONTAIN CREATE ACCOUNT BUTTON ELEMENT");
if (logoutButton === null) throw new Error("DOM DOES NOT CONTAIN LOGOUT BUTTON ELEMENT");

loginButton.addEventListener("click", attemptLogin);
createAccountButton.addEventListener("click", attemptCreateAccount);
logoutButton.addEventListener("click", attemptLogout);


///////////////////////////////////////////////////////////////////