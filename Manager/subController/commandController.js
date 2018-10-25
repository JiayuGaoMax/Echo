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

app.post("CommandHandler", function (req, res) {
    let imageCommands = Array.prototype.slice.call(req.body.imageCommands);
    for (let i = 0; i < imageCommands.length; i++) {
        console.log(imageCommands[i].imageName + imageCommands[i].hourStart);
    }
})