const USERNAMELENGTH = 4;
const PASSWORDLENGTH = 4;

let form = {
    signUp: document.getElementById("SignUpForm"),
    username: document.getElementById("username"),
    managerPassword: document.getElementById("managerPassword"),
    confirmManagerPassword: document.getElementById("confirmManagerPassword"),
    displayPassword: document.getElementById("displayPassword"),
    confirmDisplayPassword: document.getElementById("confirmDisplayPassword")
};

let errmsg = {
    usernameError: document.getElementById("usernameError"),
    managerPasswordError: document.getElementById('managerPasswordError'),
    confirmManagerPasswordError: document.getElementById('confirmManagerPasswordError'),
    displayPasswordError: document.getElementById('displayPasswordError'),
    confirmDisplayPasswordError: document.getElementById('confirmDisplayPasswordError'),
    formError: document.getElementById("formError")
};

//form submit
form.signUp.addEventListener("submit", validateForm);


function validateForm(e) {
    let msg1 = "";
    let msg2 = "";
    let msg3 = "";
    let msg4 = "";
    let msg5 = "";
    let msg6 = "";

    //check username
    if (form.username.value === "") {
        msg1 = " Please enter a username";
        errmsg.usernameError.style.color = "red";
        form.username.style.borderColor = "red";
    } else if(form.username.value.length < USERNAMELENGTH) {
        msg1 = " Username must be 6 characters long";
        errmsg.usernameError.style.color = "red";
        form.username.style.borderColor = "red";
    } else {
        msg1 = "";
        errmsg.usernameError.style.color = "initial";
        form.username.style.borderColor = "initial";
    }

    //check manager password
    if (form.managerPassword.value === "") {
        msg2 = " Please enter a password";
        errmsg.managerPasswordError.style.color = "red";
        form.managerPassword.style.borderColor = "red";
    } else if(form.managerPassword.value.length < PASSWORDLENGTH) {
        msg2 = " Password must be 4 characters long";
        errmsg.managerPasswordError.style.color = "red";
        form.managerPassword.style.borderColor = "red";
    } else if (form.managerPassword.value !== form.confirmManagerPassword.value) {
        msg2 = " Passwords do not match";
        errmsg.managerPasswordError.style.color = "red";
        form.managerPassword.style.borderColor = "red";
    } else {
        msg2 = "";
        errmsg.managerPasswordError.style.color = "initial";
        form.managerPassword.style.borderColor = "initial";
    }

    if (form.confirmManagerPassword.value === "") {
        msg3 = " Please confirm password";
        errmsg.confirmManagerPasswordError.style.color = "red";
        form.confirmManagerPassword.style.borderColor = "red";
    } else {
        msg3 = "";
        errmsg.confirmManagerPasswordError.style.color = "initial";
        form.confirmManagerPassword.style.borderColor = "initial";
    }

    //check display password
    if (form.displayPassword.value === "") {
        msg4 = " Please enter a display password";
        errmsg.displayPasswordError.style.color = "red";
        form.displayPassword.style.borderColor = "red";
    }  else if(form.displayPassword.value.length < PASSWORDLENGTH) {
        msg4 = " Display password must be 4 characters long";
        errmsg.displayPasswordError.style.color = "red";
        form.displayPassword.style.borderColor = "red";
    } else if(form.displayPassword.value !== form.confirmDisplayPassword.value) {
        msg4 = " Display passwords do not match";
        errmsg.displayPasswordError.style.color = "red";
        form.displayPassword.style.borderColor = "red";
    } else {
        msg4 = "";
        errmsg.displayPasswordError.style.color = "initial";
        form.displayPassword.style.borderColor = "initial";
    }

    if (form.confirmDisplayPassword.value === "") {
        msg5 = " Please confirm display password";
        errmsg.confirmDisplayPasswordError.style.color = "red";
        form.confirmDisplayPassword.style.borderColor = "red";
    } else {
        msg5 = "";
        errmsg.confirmDisplayPasswordError.style.color = "initial";
        form.confirmDisplayPassword.style.borderColor = "initial";
    }

    //check if manager password and display password are the same
    if(form.managerPassword.value === form.displayPassword.value) {
        msg6 = "Password and display password must be different";
        errmsg.formError.style.color = "red";
    } else {
        msg6 = "";
        errmsg.formError.style.color = "initial";
    }

    //error messages
    if(msg1 !== "" || msg2 !== "" || msg3 !== "" || msg4 !== "" || msg5 !== "" || msg6 !== "") {
        errmsg.usernameError.innerHTML = msg1;
        errmsg.managerPasswordError.innerHTML = msg2;
        errmsg.confirmManagerPasswordError.innerHTML = msg3;
        errmsg.displayPasswordError.innerHTML = msg4;
        errmsg.confirmDisplayPasswordError.innerHTML = msg5;
        errmsg.formError.innerHTML = msg6 + '<br>';

        e.preventDefault();
    } else {
        errmsg.usernameError.innerHTML = msg1;
        errmsg.managerPasswordError.innerHTML = msg2;
        errmsg.confirmManagerPasswordError.innerHTML = msg3;
        errmsg.displayPasswordError.innerHTML = msg4;
        errmsg.confirmDisplayPasswordError.innerHTML = msg5;
        errmsg.formError.innerHTML = msg6;
    }
}
