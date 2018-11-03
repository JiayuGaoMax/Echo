//This must be redeclare for every app
let express = require('express');
let app = module.exports = express();
let path = require('path');
let bodyParser = require('body-parser');
let dba = require("./modules/LoginModule.js");
let session = require('express-session');

//body parser set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 120 * 60 * 1000}}));//Set Session time 5 minue

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

app.use("/css", express.static(path.join(__dirname, "../css/"))); //link stylesheet

//Get login request from user render the login page
app.get('/Login', function (req, res) {
    console.log("User In the login function");
    res.render('Login');
});
//Get login post from user and post the request
app.post('/LoginHandler', function (req, res) {
    let user_name = req.body.username;
    let password = req.body.password;
    dba.LoginCheck(user_name, password, function (err, manager, display) {
        if (err) throw err;
        else if (manager) {
            req.session.username = user_name;//test
            req.session.isLoginedIn = true;//test
            console.log("Manager is login do something here ");
            res.redirect("/ManagerDashboard");//test for session
        } else if (display) {
            req.session.username = user_name;//test
            req.session.isLoginedIn = true;//test
            console.log("Display login do something here");
            res.redirect("/DisplayDashboard");//test for session
        }
        else {
            console.log("Login fail, " + manager + display);
            res.redirect("/Login");
        }
    });
    console.log("User name = " + user_name + ", password is " + password);
});
