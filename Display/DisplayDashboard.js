let express = require('express');
let app = module.exports = express();
let path = require('path');
let dba = require("./modules/DisplayDashboard");

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

//Get Manager request from user render the Manager page
app.get('/DisplayDashboard', async function (req, res) {
    console.log("User In the Display function");
    let result;
    result = await dba.queryDisplayGroups(req.session.username);


    res.render('DisplayDashboard', {DisplayDashboard: 'DisplayDashboard', displayName: result});
});
