var mongodb_uri;
var mongodb_database;

function init(uri, db) {
    if (uri !== undefined) {
        if (uri.charAt(uri.length - 1) !== '/') {
            uri += '/';
        }

        mongodb_uri = uri;

    } else {
        /* default */
        mongodb_uri = "mongodb://127.0.0.1:27017/";
    }

    if (db !== undefined) {
        mongodb_database = db;

    } else {
        /* project default */
        mongodb_database = "get-productive";
    }

    return exports;
}

function addSession(start_time, end_time, callback) {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(mongodb_uri + mongodb_database, function(err, db) {
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

    MongoClient.connect(mongodb_uri + mongodb_database, function(err, db) {
        if (err) {
            throw err;

        } else {
            db.collection('sessions').find().toArray(callback(err, items));
        }
    });
}

exports.addSession = addSession;
exports.listSessions = listSessions;module.exports = init;