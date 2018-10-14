var exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";

exports.AddUser = function(username, managerPassword, displayPassword, callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, async function (err, db) {
        if (err) {
            console.log("Unable to connect to the server");
            throw err;
        } else {
            console.log("Connection established");

            let dbo = db.db("Echo");
            let insertUser = {username: username, managerPassword: managerPassword, displayPassword: displayPassword};

            dbo.collection("users").insertOne(insertUser, function (err, res) {
                if (err) {
                    callback(err, false)
                } else {
                    console.log("1 document inserted");
                    callback(err, true);
                }

            });
            db.close();
        }
    });
};