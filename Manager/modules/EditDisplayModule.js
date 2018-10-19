exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here

exports.addOneImageInfoToDatabase = function (displayGroupID, path) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID, imagePath: path}
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('images').insertOne(query, function (err) {
                if (err) reject(err);
                else {
                    resolve("Insert " + query + " successfully");
                    db.close();
                }


            })

        })

    })
}


exports.queryAllImages = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID}
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('images').find(query).toArray(function (err, result) {
                if (err) reject(err);
                else {
                    resolve(result);
                    db.close();
                }

            })

        })

    })
}


//Two delete function  be tested

exports.deleteAllImagesInDatabase = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID};
        return MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db('Echo');
            dbo.collection('images').deleteMany(query, {useNewUrlParser: true}, function (err, result) {
                if (err) reject(err);
                else resolve(result.result.n + "Documents was deleted");
                db.close();

            })

        })
    })
}

exports.deleteOneImageInDatabase = function (imageID) {
    return new Promise(function (resolve, reject) {
        let query = {_id: ObjectId(imageID)};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db('Echo');
            dbo.collection('images').deleteOne(query, function (err, result) {
                if (err) reject(err);
                else resolve(result.result.n + "Documents was deleted");
                db.close();

            })

        })
    })
}