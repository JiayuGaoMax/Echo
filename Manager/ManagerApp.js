let express = require('express');
let app = module.exports = express();
let ManagerDashoard = require('./ManagerDashboard.js');
app.use(ManagerDashoard);
let EditDisplay = require('./EditDisplay.js');
app.use(EditDisplay);