let express = require('express');
let app = module.exports = express();
let dba = require("./modules/imageModule.js");
let imgCtrl = require("./subController/imageController.js");//Because this page is complex, need to spite into several sub controller
app.use(imgCtrl);
let path = require('path');


app.use(express.static("public"));
//end file uploader config

app.get('/EditDisplay', async function (req, res) {
    let groupID = req.query.groupID;// get the ID of that group to know where to manage
    let images = await dba.queryAllImages(groupID);
    let displaygroupName=await dba.queryDisplayGroupNameByID(groupID);
    //res.send(images);
    res.send(groupID + images);
    console.log(displaygroupName);

});

app.get('/TestUpload', function (req, res) {
    res.sendFile(__dirname + "/Test/Test Upload.html");
})

app.get("/testImages", async function (req, res) {
    let images = await dba.queryAllImages(1234);
   // console.log(images);
   // res.send(images);
    //res.send(images[0].imagePath);
    res.send("<img alt=\"Poster\" id=\"poster\" src=\""+"/userUpload/"+path.basename(images[0].imagePath)+"\">"
        // this is how to transfer location in database to location in the server file system


    );


})
