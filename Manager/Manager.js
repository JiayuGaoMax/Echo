let express = require('express');
let app = module.exports = express();
let path = require('path');
let dba = require("./modules/ManagerDashboard.js");

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

//app.get('/Manager', async function (req, res) {
//    console.log("User In the Manager function");
//    res.render('Manager');
//});

//Get Manager request from user render the Manager page
app.get('/ManagerDashboard', async function (req, res) {
    console.log("User In the Manager function");

    let result;
    //await dba.addGroup("Max","Test");
    result=await dba.queryDisplayGroups(req.session.username);
    //res.send(result);

    res.render('ManagerDashboard', {ManagerDashboard: 'ManagerDashboard', json: result});
});