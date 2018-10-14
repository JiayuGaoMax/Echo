let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    let dbo = db.db("Echo");
    let myobj = {username: "Max", managerPassword: "1234", displayPassword:"12345"};
    dbo.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

