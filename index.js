let express = require('express');
let app = express();
let LoginSignupApp = require("./LoginAndSignUp/LoginAndSignupApp");
app.use(LoginSignupApp);
let manager = require('./Manager/ManagerApp.js');
app.use(manager);
let display = require('./Display/DisplayApp.js');
app.use(display);

app.get('/', function (req, res) {
    res.redirect("/Login");
});
app.listen(3000);