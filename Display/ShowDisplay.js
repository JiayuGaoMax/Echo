let express = require('express');
let app = module.exports = express();
let path = require('path');
let dba = require("./modules/ShowDisplayModule.js");

app.set('views', path.join(__dirname, 'views'));//Set the view engine path to views
app.set('view engine', 'pug');

app.use("/ShowDisplay", express.static(path.join(__dirname, "public")));

app.get('/ShowDisplay', async function (req, res) {
    let groupID = req.query.groupID;// get the ID of that group to know where to manage
    let imageAndCommand = await dba.queryAllImageCommand(groupID);
    let currentState = await dba.queryCurrentState(groupID);
    let displayGroupName = await dba.queryDisplayGroupNameByID(groupID);
    res.render('ShowDisplay', {
        displayGroupID: groupID,
        ShowDisplay: 'ShowDisplay',
        images: imageAndCommand,// Put image and command here view engine will accept that use image.imageCommand to access data in the imageCommand
        imagePath: path,
        currentState: currentState,
        displayGroupName:displayGroupName
    });
});

app.get("/StateCheckHandler", async function (req, res) {
    let groupID = req.query.groupID;// get the ID of that group to know where to Display
    let clientCurrentState = req.query.clientCurrentState;// get the ID of that group to know where to manage
    var serverCurrentState = "";
    console.log(groupID + " " + clientCurrentState)
    let isGroupExist = await dba.ifDisplayGroupExist(groupID);
    if (isGroupExist) {
        try {
            serverCurrentState = await dba.queryCurrentState(groupID);//Program will crash if client
        }
        catch (e) {
            console.log(e);
            res.send("Deleted");
            return;
        }
        if (clientCurrentState == serverCurrentState)
            res.send(true);
        else res.send(false);
    }
    else res.send("Deleted");
})
