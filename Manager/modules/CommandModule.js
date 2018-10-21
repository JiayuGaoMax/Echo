exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here

//To be tested
exports.addDefaultCommand = function (imageName) {
    return new Promise(function (resolve, reject) {
        let query = {
            imageName: imageName,
            hourStart: 0,
            minuteStart: 0,
            hourEnd: 23,
            minuteEnd: 59,
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


            })

        })

    })
}
//To Be tested
exports.updateCommand = function (imageName, hourStart, minutesStart, hourEnd, minutesEnd) {
    return new Promise(function (resolve, reject) {
        let query = {imageName: imageName};
        let newValue = {
            $set: {
                hourStart: hourStart,
                minuteStart: minutesStart,
                hourEnd: hourEnd,
                minutesEnd: minutesEnd
            }
        };
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("command").updateOne(query, newValue, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve("New State is now set to" + newState);
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