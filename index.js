var express = require('express');
var app = express();
var login = require('./LoginAndSignUp/Login.js');
app.use(login);

app.get('/', function (req, res) {
    res.send("rood dir");
});
app.listen(3000);