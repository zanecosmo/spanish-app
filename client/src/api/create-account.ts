// const attemptCreateAccount = async () => {
//     const user = extractUserInfo(createAccountInputs);
//     console.log(createAccountInputs.password.validationMessage);
    
//     if (createAccountInputs.password.validationMessage || createAccountInputs.username.validationMessage) {
//         appendValidationMessages(".create-account", createAccountInputs);
//         return makeVisible(".validation-messages.create-account")
//     };
//     if (user.username === "" || user.password === "") {
//         throw new Error("USERNAME OR PASSWORD VALIDATED INCORRECTLY");
//     };

//     makeInvisible(".validation-messages.create-account");

//     const headers = new Headers({
//         "Accept": "application/json, text/plain, */*",
//         "Content-Type": "application/json"
//     });

//     const jsonMessage = {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(user)
//     };

//     const serverURL = "http://localhost:8000/create-account";

//     const response = await fetch(serverURL, jsonMessage);
//     const body = await response.json();

//     if (response.status === 403) {
//         const responseMessage = document.querySelector(".response-error.create-account");
//         responseMessage.textContent = body.message;
//         return;
//     };

//     state.accessToken = `${body.accessToken}shart`;

//     loadHomepage();
// };