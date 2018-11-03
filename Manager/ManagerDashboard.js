let express = require('express');
let app = module.exports = express();
let path = require('path');
let dba = require("./modules/ManagerDashboard.js");

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