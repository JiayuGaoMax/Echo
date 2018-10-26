let express = require('express');
let app = module.exports = express();
//app.use(express.static(path.join("node_modules/viewerjs/dist")));
let path = require('path');
let dba = require("./modules/DisplayDashboard.js");
let session = require('express-session');

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

//Get Manager request from user render the Manager page
app.get('/DisplayDashboard', async function (req, res) {
    console.log("User In the Manager function");
    res.send(req.session.username + "In Display dashboard");
});