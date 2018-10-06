let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let query = {username: "Max", managerPassword: "1234567"};
    //dbo.user.count(query);
    //select count of rows been selected
    dbo.collection("user").find(query).count(function (err, ctr) {
        if (err) throw err;
        console.log(ctr);
        db.close();
    });

    queryUser(dbo, query).then((isLoginIn) => {
        console.log("user is " + isLoginIn + " Login ");
    });
    //selected content
    dbo.collection("user").findOne(query, function (err, result) {
        if (err) throw err;
        //console.log(result.username+ result.managerPassword)
        db.close();
    });
});

function queryUser(dbo, query) {
    return new Promise(function (resolve, reject) {
        dbo.collection("user").find(query).count(function (err, result) {
            if (err) reject(err);
            else if (result > 0) {
                console.log(result);
                resolve(true);
            }
            else resolve(false);
        });
    });
}

