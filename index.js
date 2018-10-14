var express = require('express');
var app = express();
var login = require('./LoginAndSignUp/Login.js');
app.use(login);
var SignUp = require('./LoginAndSignUp/SignUp.js');
app.use(SignUp);

app.get('/', function (req, res) {
    res.send("root dir");
});
app.listen(3000);