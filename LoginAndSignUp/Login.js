//This must be redeclare for every app
let express = require('express');
let app = module.exports = express();
let path = require('path');
let bodyParser=require('body-parser');

//body parser set up
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//view engine set up
app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
//This must be redeclare for every app

//Get login request from user render the login page
app.get('/Login', function(req, res){
    console.log("User In the login function");
  res.render('Login');
});
//Get login post from user and post the request
app.post('/LoginHandler', function(req, res){
    let user_name=req.body.username;
    let password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});
