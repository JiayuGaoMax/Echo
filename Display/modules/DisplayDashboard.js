exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here

exports.queryDisplayGroups = function (queryName) {
    let query = {username: queryName};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").find(query).toArray(function (err, result) {
                if (err)
                    reject(err);
                else {
                    resolve(result);
                    db.close();
                }
            })

        });

    });
}