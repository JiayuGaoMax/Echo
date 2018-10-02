var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    return db;
});
isManagerLoginSuccess("good", 'morning');
function isManagerLoginSuccess(username, managerPassword) {
    return MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        let dbo = db.db("mydb");
        let query = {
            username: username,
            managerPassword: managerPassword
        };
        let r=dbo.collection("user").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        })
    if (r.rowsAffected>0) return false;
    else return true;
    });
}