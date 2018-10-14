let express = require('express');
let app = express();
let login = require('./LoginAndSignUp/Login.js');
app.use(login);
<<<<<<< HEAD
var SignUp = require('./LoginAndSignUp/SignUp.js');
app.use(SignUp);
=======
let manager = require('./Manager/Manager.js');
app.use(manager);
>>>>>>> f1bfeab595aadf92984416c72d100ec35a5c7a46

app.get('/', function (req, res) {
    res.send("root dir");
});
app.listen(3000);