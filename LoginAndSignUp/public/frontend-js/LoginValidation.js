function validateForm() {
    let x = document.forms["loginForm"]["username"].value;
    if (x == "") {
        alert("User name must be filled out");
        return false;
    }
}