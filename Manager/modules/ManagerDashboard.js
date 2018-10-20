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

exports.addGroup = function (userName, displayGroupName) {
    let query = {username: userName, displayGroupName: displayGroupName};

    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").insertOne(query, function (err) {
                if (err)
                    reject(err);
                else {
                    resolve("Insert " + query + " successfully");
                    db.close();
                }

            })

        });

    });


}

exports.queryDisplayGroupID = function (queryName, displayGroupName) {
    let query = {username: queryName, displayGroupName: displayGroupName};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").findOne(query, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result._id);
            })
            db.close();
        });

    });
}





