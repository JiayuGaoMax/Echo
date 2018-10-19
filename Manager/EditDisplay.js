let express = require('express');
let app = module.exports = express();
let dba = require("./modules/EditDisplayModule.js");
let imgCtrl = require("./subController/imageController.js");//Because this page is complex, need to spite into several sub controller
app.use(imgCtrl);


app.use(express.static("public"));
//end file uploader config

app.get('/EditDisplay', async function (req, res) {
    let groupID = req.query.groupID;// get the ID of that group to know where to manage
    let images = await dba.queryAllImages(groupID);
    //res.send(images);
    res.send(groupID + images);
    console.log(groupID);

});

app.get('/TestUpload', function (req, res) {
    res.sendFile(__dirname + "/Test/Test Upload.html");
})

app.get("/testImages", async function (req, res) {
    let images = await dba.deleteOneImageInDatabase("5bca14faa34c1a04ac7c9250");
    console.log(images);
    res.send(images);
    //res.send(images[0].imagePath);
    //res.send("<img alt=\"Poster\" id=\"poster\" src=\""+"/userUpload/"+path.basename(images[0].imagePath)+"\">")

})
