let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/Echo";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    let dbo = db.db("Echo");
    let myobj = {username: "Max", managerPassword: "1234"};
    dbo.collection("user").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});