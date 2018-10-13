var exports = module.exports = {};
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";//removed mudb here


exports.LoginCheck = function (username, password, callback) {
    //might be future securities risk of using var
    var managerLogin = false;
    var displayLogin = false;
    MongoClient.connect(url, {useNewUrlParser: true}, async function (err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");//Base on database name
        let queryManager = {username: username, managerPassword: password};//{$and: [{username: username}, {managerPassword: password}]};
        let queryDisplay = {username: username, displayPassword: password};

        try {
            managerLogin = await queryUser(dbo, queryManager);

            displayLogin = await queryUser(dbo, queryDisplay);

            callback(err, managerLogin, displayLogin);

        } catch (e) {
            callback(e, managerLogin, displayLogin);
        }
        db.close();
    })


}

function queryUser(dbo, query) {
    return new Promise(function (resolve, reject) {
        dbo.collection("user").find(query).count(function (err, result) {
            if (err) reject(err);
            else if (result > 0) {
                console.log(result);
                resolve(true);
            }
            else reject(false);
        });
    });
}


/*
        dbo.collection("user").find(queryManager).count(function (err, result) {
            if (err) throw err;
            if (result > 0) managerLogin = true;
            console.log(result);
            console.log(managerLogin);

        });

        dbo.collection("user").find(queryDisplay, function (err, result) {
            if (err) throw err;
            if (result.rowsAffected > 0) displayLogin = true;
        });
        */