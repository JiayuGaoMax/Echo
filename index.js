let express = require('express');
let app = express();
let login = require('./LoginAndSignUp/Login.js');
app.use(login);
<<<<<<< HEAD
let SignUp = require('./LoginAndSignUp/SignUp.js');
app.use(SignUp);
=======
<<<<<<< HEAD
var SignUp = require('./LoginAndSignUp/SignUp.js');
app.use(SignUp);
=======
>>>>>>> 10774cba94b1e71816ad3902e8a30860bb5e96d7
let manager = require('./Manager/Manager.js');
app.use(manager);
>>>>>>> f1bfeab595aadf92984416c72d100ec35a5c7a46

app.get('/', function (req, res) {
    res.send("root dir");
});
app.listen(3000);