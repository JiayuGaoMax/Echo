var localtState = ""// Local state is recording what is current displayed in image gallery

// View a list of images
function checkState() {
    var xhttp;
    let currentState = document.getElementById("currentState").innerHTML;// current State is recording the state of observer
    let displayGroupID = document.getElementById("displayGroupID").innerHTML;


    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            if (this.responseText == "false") {
                location.reload(true);
            }// If client is different form server then refresh
            else if (this.responseText == "Deleted") {
                window.location.href = "/Login";
            }
        }

    };
    xhttp.open("GET", "/StateCheckHandler?groupID=" + displayGroupID + "&clientCurrentState=" + currentState, true);
    xhttp.send();
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    // add zero in front of numbers < 10
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

function createNewViewer() {
    var images = document.getElementById("images");//images;
    var imagesElements = images.getElementsByTagName("img");
    return new Viewer(images, {
        inline: false,
        interval:parseInt(document.getElementById("commands").getElementsByTagName("textarea")[2].innerHTML),
        shown: function () {
            //alert(document.getElementById("commands").getElementsByTagName("textarea")[2].innerHTML);
            this.viewer.play(true);
            //setInterval(viewer.update(), 60000);//Check if image is in rage every one minute
        },
        hidden: function () {
            this.viewer.destroy();
        },
        filter(image) {
            //console.log(image.alt);
            //alert("Updated");
            let currentIndex = getImageIndex(image, imagesElements);
            let startTime = document.getElementById("commands").getElementsByTagName("textarea")[currentIndex * 3].innerHTML;
            let endTime = document.getElementById("commands").getElementsByTagName("textarea")[currentIndex * 3 + 1].innerHTML;
            if (startTime < getCurrentTime() && getCurrentTime() < endTime) {//If current time is in between start and end time then display the image
                localtState += currentIndex.toString();
                return true;
            }
            else return false;
        }
    })
}



function restartViewer(viewer) {
    viewer.destroy();
    viewer = createNewViewer();
    viewer.show();
}

function updateInternalState(viewer) {
    var imageLength = images.getElementsByTagName("img").length;
    var workingState = "";
    for (let index = 0; index < imageLength; index++) {
        let startTime = document.getElementById("commands").getElementsByTagName("textarea")[index * 3].innerHTML;
        let endTime = document.getElementById("commands").getElementsByTagName("textarea")[index * 3 + 1].innerHTML;
        if (startTime < getCurrentTime() && getCurrentTime() < endTime) //If current time is in between start and end time then display the image
            workingState += index.toString();
    }
    console.log("Working state " + workingState);
    console.log("Current  state " + localtState);
    if (workingState !== localtState) {//if working state not equal to current state then restart the viewer
        localtState = "";
        restartViewer(viewer);
    }
}

//main function of windows
window.addEventListener('DOMContentLoaded', function () {
    setInterval(checkState, 5000);//Check the state with server every 5 second
    //alert(document.getElementById("commands").getElementsByTagName("textarea")[0].innerHTML);
    document.getElementById('testState').addEventListener('click', function () {
        alert(getCurrentTime())
    });

    //document.write(images.length);
    var imagesElements = images.getElementsByTagName("img");
    //console.log(getCurrentTime());//Test get current time in hh:mm format
    var viewer = createNewViewer();
    viewer.show();
    document.getElementById('button').addEventListener('click', function () {
        var viewer = createNewViewer();
        viewer.show();
        alert(localtState);
        // image.click();
        setInterval(function () {
            updateInternalState(viewer)
        }, 10000)
    });
});
