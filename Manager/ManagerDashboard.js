let express = require('express');
let app = module.exports = express();
let path = require('path');
let dba = require("./modules/ManagerDashboard.js");
let fs = require("fs");

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

app.use("/css", express.static(path.join(__dirname, "../css/"))); //link stylesheet

//Get Manager request from user render the Manager page
app.get('/ManagerDashboard', async function (req, res) {
    console.log("User In the Manager function");
    let result;
    //await dba.addGroup("Max","Test"); This function could add a group to database
    //var id = await dba.queryDisplayGroupID("Max", "Haha"); //This function get user name and display group name and return ID
    result = await dba.queryDisplayGroups(req.session.username);
    //console.log(id);
    //res.send(result);

    res.render('ManagerDashboard', {ManagerDashboard: 'ManagerDashboard', displayName: result});
});

app.post('/addDisplayGroup', async function (req, res) {
    let displayName = req.body.addDisplay;
    await dba.addGroup(req.session.username, displayName);
    res.redirect("/ManagerDashboard")
});


///To be tested
app.get('/deleteDisplayGroupHandler', async function (req, res) {
    let displayName = req.query.displayName;//Thi field require display name
    let groupID = req.query.groupID;
    let allImageName = await dba.queryAllImageNames(groupID);
    for (let imageName of allImageName) {
        dba.deleteCommand(imageName.imageName);//Delete commands before deleting images
        console.log(imageName.imageName);
        deleteOneImageInFileSystem(imageName.imageName);
    }
    await dba.deleteGroup(req.session.username, displayName);
    dba.deleteAllImagesInDisplayGroup(groupID);
    console.log(displayName + " is deleted");
    res.redirect("/ManagerDashboard")
});

function deleteOneImageInFileSystem(imageName) {
    console.log(imageName);
    fs.unlink("./Manager/public/userUpload/" + imageName, (err) => {
        if (err) {
            console.log("failed to delete local image:" + err);
        } else {
            console.log('successfully deleted local image');
        }
    });
}