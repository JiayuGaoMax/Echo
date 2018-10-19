let express = require('express');
let app = module.exports = express();
let path = require('path');
let multer = require('multer');
let dba = require("../modules/EditDisplayModule.js");
const fs = require("fs");

//file uploader configuration
let storageConfig = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../Echo/Manager/public/userUpload/');//this is where the files go
    },
    filename: function (req, file, callback) {
        if (file.mimetype == 'image/png')//if files is PNG append with .png
            callback(null, file.fieldname + '-' + Date.now() + '.png');//This is file name was set as file name + current time
    }
})
let upload = multer({storage: storageConfig}).array("userPhoto", 10);
app.use(express.static( "public"));
//end file uploader config



//This handles the user drag and drop upload request
app.post("/upLoadImageHandler", function (req, res) {
    upload(req, res, function (err) {// The maximum number of uploading is 10 don't go over that.
        if (err instanceof multer.MulterError) {
            console.log(err);
        }
        else if (err) {
            throw err
        }
        else {
            console.log(req.files);
            for (let image of req.files)
                dba.addOneImageInfoToDatabase(1234, image.path);// This function take a display group ID and image path store in the database
        }
    })

})