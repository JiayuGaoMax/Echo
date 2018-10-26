let express = require('express');
let app = module.exports = express();
let dba = require("../modules/CommandModule");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/testCommand", async function (req, res) {
    let result = await dba.queryAllImageCommand('5bc3c2327e0b6a0cc4f6d110');
    console.log(result[0]);
    console.log(result[0].imageCommand);
})

app.post("/CommandHandler", function (req, res) {
    //let imageCommands = Array.prototype.slice.call(req.body.imageCommands);
    console.log(req.body.passInImageName);
    console.log(req.body.imageStartTime);
    console.log(req.body.imageDuration);
    console.log(req.body.imageEndTime);
    for (let i = 0; i < req.body.passInImageName.length; i++)
        dba.updateCommand(req.body.passInImageName[i], req.body.imageStartTime[i], req.body.imageEndTime[i]);
    res.redirect("back");
})