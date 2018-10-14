let express = require('express');
let app = module.exports = express();
let dba = require("./modules/ManagerDashboard.js");

app.get('/ManagerDashboard', async function (req, res) {
    let result;
    //await dba.addGroup("Max","Test");
    result=await dba.queryDisplayGroups(req.session.username);
    res.send(result);
});