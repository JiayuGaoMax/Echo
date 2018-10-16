let express = require('express');
let app = express();
let LoginSignupApp = require("./LoginAndSignUp/LoginAndSignupApp");
app.use(LoginSignupApp);
//let login = require('./LoginAndSignUp/Login.js');
//app.use(login);
//let SignUp = require('./LoginAndSignUp/SignUp.js');
//app.use(SignUp);
let manager = require('./Manager/Manager.js');
app.use(manager);
app.get('/', function (req, res) {
    res.send("root dir");
});
app.listen(3000);