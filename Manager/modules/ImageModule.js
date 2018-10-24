exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here
let cmdModule = require("./CommandModule.js");

exports.addOneImageInfoToDatabase = function (displayGroupID, path, imgName) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID, imagePath: path, imageName: imgName};
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
};


exports.queryAllImages = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {displayGroupID: displayGroupID};
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


//Two delete function  be tested

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

exports.deleteOneImageInDatabase = function (imageID) {
    return new Promise(async function (resolve, reject) {
        //query image name, delete command then delete image
        let imageId = await queryImageNameByID(imageID);
        cmdModule.deleteCommand(imageId);
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
};

exports.queryDisplayGroupNameByID = function (displayGroupID) {
    let query = {_id: ObjectId(displayGroupID)};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").findOne(query, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result.displayGroupName);
            });
            db.close();
        });

    });
};


exports.updateDisplayGroupState = function (displayGroupID) {
    let query = {_id: ObjectId(displayGroupID)};
    let newState = Math.random();
    let newValue = {$set: {state: newState}};
    return new Promise(function (resolve, reject) {
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection("displayGroup").updateOne(query, newValue, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve("New State is now set to" + newState);
            })
            db.close();
        });

    });
}

queryImageNameByID = function (imageID) {
    return new Promise(function (resolve, reject) {
        let query = {_id: ObjectId(imageID)};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db('Echo');
            dbo.collection('images').findOne(query, function (err, result) {
                if (err) reject(err);
                else resolve(result.imageName);
                db.close();

            })

        })
    })
};
