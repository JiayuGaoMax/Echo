exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let url = "mongodb+srv://Shared:1q2w3e4r.@cluster0-urxdu.mongodb.net";//removed  here

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

exports.queryCurrentState = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {_id: ObjectId(displayGroupID)};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('displayGroup').findOne(query, function (err, result) {
                if (err) reject(err);
                else {
                    resolve(result.state);
                    db.close();
                }

            })

        })

    })
};

exports.ifDisplayGroupExist = function (displayGroupID) {
    return new Promise(function (resolve, reject) {
        let query = {_id: ObjectId(displayGroupID)};
        return MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            let dbo = db.db("Echo");
            dbo.collection('displayGroup').find(query).count(function (err, result) {
                if (err) reject(err);
                else if (result > 0) {
                    //console.log(result);
                    resolve(true);
                    db.close();
                }
                else {
                    //console.log(result);
                    resolve(false);
                    db.close();
                }
            })

        })

    })
}