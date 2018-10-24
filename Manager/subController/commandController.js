let express = require('express');
let app = module.exports = express();
let dba = require("../modules/CommandModule");

app.get("/testCommand", async function (req, res) {
    let result = await dba.queryAllImageCommand('5bc3c2327e0b6a0cc4f6d110');
    console.log(result[0]);
    console.log(result[0].imageCommand);
})