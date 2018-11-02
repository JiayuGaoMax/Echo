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
    let initialState= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;//put a random string in the database to represent state
    let query = {username: userName, displayGroupName: displayGroupName,state:initialState};
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

exports.deleteGroup = function (userName, displayGroupName) {
    let query = {username: userName, displayGroupName: displayGroupName};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").deleteOne(query, function (err) {
                if (err)
                    reject(err);
                else {
                    resolve("Delete " + query + " successfully");
                    db.close();
                }

            })

        });

    });


}

exports.deleteCommand = function (imageName) {
    return new Promise(function (resolve, reject) {
        let query = {imageName: imageName};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("command").deleteOne(query, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result.result.n + "command was deleted");
            })
            db.close();
        });

    });
}


exports.deleteAllImagesInDisplayGroup = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db('Echo');
            dbo.collection('images').deleteMany(query, function (err, result) {
                if (err) reject(err);
                else resolve(result.result.n + "Documents was deleted");
                db.close();

            })

        })
    })
};


exports.queryAllImageNames = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID};
        let projection = {projection: {_id: 0, imageName: 1}};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('images').find(query, projection).toArray(function (err, result) {
                if (err) reject(err);
                else {
                    resolve(result);
                    db.close();
                }

            })

        })

    })
};

