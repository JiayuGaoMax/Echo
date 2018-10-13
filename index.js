let express = require('express');
let app = express();
let login = require('./LoginAndSignUp/Login.js');
app.use(login);
let manager = require('./Manager/Manager.js');
app.use(manager);

app.get('/', function (req, res) {
    res.send("rood dir");
});
app.listen(3000);