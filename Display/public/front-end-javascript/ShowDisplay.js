// View a list of images
function checkState() {
    var xhttp;
    currentState = document.getElementById("currentState").innerHTML;
    displayGroupID = document.getElementById("displayGroupID").innerHTML;


    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            if (this.responseText == "false")
                location.reload(true);// If client is different form server then refresh
        }
    };
    xhttp.open("GET", "/StateCheckHandler?groupID=" + displayGroupID + "&clientCurrentState=" + currentState, true);
    xhttp.send();
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ;  // add zero in front of numbers < 10
    return i;
}

function getCurrentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // add a zero in front of numbers<10
    m = checkTime(m);
    h = checkTime(h);
    return h + ":" + m;
}

function getImageIndex(image, imagesElements) {

    for (let index = 0; index < imagesElements.length; index++)
        if (image.alt === imagesElements[index].alt)
            return index;
}

window.addEventListener('DOMContentLoaded', function () {
    setInterval(checkState, 5000);//Check the state with server every 5 second

    //alert(document.getElementById("commands").getElementsByTagName("textarea")[0].innerHTML);
    document.getElementById('testState').addEventListener('click', function () {
        alert(getCurrentTime())
    });
    var images = document.getElementById("images")//images;
    //document.write(images.length);
    var imagesElements = images.getElementsByTagName("img");
    //console.log(getCurrentTime());//Test get current time in hh:mm format

    document.getElementById('button').addEventListener('click', function () {
        var viewer = new Viewer(images, {
                inline: false,
                shown: function () {
                    viewer.play(true);
                },
                filter(image) {
                    //console.log(image.alt);
                    let currentIndex = getImageIndex(image, imagesElements);
                    let startTime = document.getElementById("commands").getElementsByTagName("textarea")[currentIndex * 3].innerHTML;
                    let endTime = document.getElementById("commands").getElementsByTagName("textarea")[currentIndex * 3 + 1].innerHTML;
                    if (startTime < getCurrentTime() && getCurrentTime() < endTime)
                        return true;
                    else return false;
                }
            })
        ;
        // image.click();
        viewer.show();

    });
});
