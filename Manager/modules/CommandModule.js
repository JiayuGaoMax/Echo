exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here

//To be tested
exports.addDefaultCommand = function (imageName) {
    return new Promise(function (resolve, reject) {
        let query = {
            imageName: imageName,
            timeStart: "00:00",
            timeEnd: "23:59",
            timeDuration: 3000
        };
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('command').insertOne(query, function (err) {
                if (err) reject(err);
                else {
                    resolve("Insert " + query + " successfully");
                    db.close();
                }
                db.close();

            })

        })

    })
}
//To Be tested
exports.updateCommand = function (imageName, newTimeStart, newTimeEnd, imageDuration) {
    return new Promise(function (resolve, reject) {
        let imageDurationMS = imageDuration * 1000;
        let query = {imageName: imageName};
        let newValue = {
            $set: {
                timeStart: newTimeStart,
                timeEnd: newTimeEnd,
                timeDuration: imageDurationMS
            }
        };
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("command").updateOne(query, newValue, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve("New State is now set to");
            })
            db.close();
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


exports.queryAllImageCommand = function (groupID) {
    return new Promise(function (resolve, reject) {
        let query = [{
            $match:
                {
                    displayGroupID: groupID
                }
        }
            ,
            {
                $lookup: {
                    from: 'command',
                    localField: 'imageName',
                    foreignField: 'imageName',
                    as: 'imageCommand'
                }
            }];
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db('Echo');
            dbo.collection('images').aggregate(query).toArray(function (err, result) {
                if (err) reject(err);
                else resolve(result);
                db.close();

            })

        })
    })
}

exports.updateDisplayGroupStateAfterCommandChange = function (displayGroupID) {
    let query = {_id: ObjectId(displayGroupID)};
    let newState = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let newValue = {$set: {state: newState}};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").updateOne(query, newValue, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve("New State is now set");
            })
            db.close();
        });

    });
}