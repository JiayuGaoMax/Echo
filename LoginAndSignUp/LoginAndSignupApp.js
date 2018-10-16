let express = require('express');
let app = module.exports = express();
let login = require('./Login.js');
app.use(login);
let SignUp = require('./SignUp.js');
app.use(SignUp);