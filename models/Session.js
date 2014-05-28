function addSession(start_time, end_time, callback) {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://127.0.0.1:27017/get-productive", function(err, db) {
        if (err) {
            callback(err);
            return;

        } else {
            db.collection('sessions').insert({
                start: start_time,
                end: end_time
            }, function(err, records) {
                if (err) {
                    callback(err);
                    return;
                }
            });
        }
    });
}

function listSessions(callback) {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://127.0.0.1:27017/get-productive", function(err, db) {
        if (err) {
            throw err;

        } else {
            db.collection('sessions').find().toArray(function(err, items) {
                if (err) {
                    throw err;
                } else {
                    callback(items);
                }
            });
        }
    });
}

exports.addSession = addSession;
exports.listSessions = listSessions;