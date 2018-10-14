//This must be redeclare for every app
let express = require('express');
let app = module.exports = express();
let path = require('path');
let bodyParser = require('body-parser');
let dba = require("./modules/SignUpModule.js");

//body parser set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

//Get SignUp request from user render the SignUp page
app.get('/SignUp', function (req, res) {
    console.log("User In the SignUp function");
    res.render('SignUp');
});
//Get login post from user and post the request
app.post('/SignUpHandler', function (req, res) {
        let username = req.body.username;
        let managerPassword = req.body.managerPassword;
        let displayPassword = req.body.displayPassword;

        dba.AddUser(username, managerPassword, displayPassword, function (err, userAdded) {
            if (err) throw err;
            else if (userAdded) {
                console.log("Sign up successful");
                res.redirect("/Login")
            } else {
                console.log("Sign up failed");
                res.redirect("/SignUp");
            }
        });
});