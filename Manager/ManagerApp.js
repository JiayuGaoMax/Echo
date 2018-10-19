let express = require('express');
let app = module.exports = express();
let ManagerDashboard = require('./ManagerDashboard.js');
app.use(ManagerDashboard);
let EditDisplay = require('./EditDisplay.js');
app.use(EditDisplay);