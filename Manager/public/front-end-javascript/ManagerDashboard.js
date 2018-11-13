/* list filter */

document.getElementById("myInput").addEventListener("keyup", myFunction);

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


let form = {
    displayForm: document.getElementById("displayForm"),
    addDisplay: document.getElementById("addDisplay")
};

let errmsg = {
    addDisplayErr: document.getElementById("addDisplayErr")
};

//form submit
form.displayForm.addEventListener("submit", validateForm);

function validateForm(e) {

    let msg1 = "";

    if (form.addDisplay.value === "") {
        msg1 = "Display name cannot be blank";
        errmsg.addDisplayErr.style.color = "red";
    } else {
        msg1 = "";
        errmsg.addDisplayErr.style.color = "initial";
    }

    if(msg1 !== "") {
        errmsg.addDisplayErr.innerHTML = msg1;

        e.preventDefault();
    } else {
        errmsg.addDisplayErr.innerHTML = msg1;
    }
}