let form = {
    login: document.getElementById("loginForm"),
    username: document.getElementById("username"),
    password: document.getElementById("password")
};

let errmsg = {
    usernameErr: document.getElementById("usernameErr"),
    passwordErr: document.getElementById('passwordErr')
};

//form submit
form.login.addEventListener("submit", validateForm);

function validateForm(e) {

    let msg1 = "";
    let msg2 = "";

    if (form.username.value === "") {
        msg1 = "Please enter your username";
        errmsg.usernameErr.style.color = "red";
        form.username.style.borderColor = "red";
    } else {
        msg1 = "";
        errmsg.usernameErr.style.color = "initial";
        form.username.style.borderColor = "#00aced";
    }

    if (form.password.value === "") {
        msg2 = "Please enter your password";
        errmsg.passwordErr.style.color = "red";
        form.password.style.borderColor = "red";
    } else {
        msg2 = "";
        errmsg.passwordErr.style.color = "initial";
        form.password.style.borderColor = "#00aced";
    }

    //error messages
    if(msg1 !== "" || msg2 !== "") {
        errmsg.usernameErr.innerHTML = msg1;
        errmsg.passwordErr.innerHTML = msg2;

        e.preventDefault();
    } else {
        errmsg.usernameErr.innerHTML = msg1;
        errmsg.passwordErr.innerHTML = msg2;
    }
}