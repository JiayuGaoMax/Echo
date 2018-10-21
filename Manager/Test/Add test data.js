let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    let dbo = db.db("Echo");
    let initialState=Math.random();//put a random number in the database to represent state
    let query = {username: "Max", displayGroupName: "12qweqwd",state:initialState};
    dbo.collection("displayGroup").insertOne(query, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

