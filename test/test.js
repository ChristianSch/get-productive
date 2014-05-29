/* Integration tests */
// var mongo = require('mocha-mongo')('mongodb://localhost');

// https://www.npmjs.org/package/mocha-steps
//

if (!process.env.MONGODB_URI) {
	var mongodb_uri = "mongodb://127.0.0.1:27017";
} else {
	var mongodb_uri = process.env.MONGODB_URI;
}

var request = require('supertest'),
	assert = require('chai').assert,
    express = require('express'),
    mongo = require('mocha-mongo')(mongodb_uri + "/get-productive"),
    app = require('../app').app;
    
var ready = mongo.ready();

describe('GET /', function() {
    it('should return 200 as status', function(done) {
        request(app).get('/').expect(200, done);
    });
});

describe('GET /foo', function() {
	it('should return 404 as status', function(done) {
		request(app).get('/foo').expect(404, done);
	});
});

describe('open mongodb', function() {
	it('should open the get-productive database', ready(function(db, done) {
		assert.notEqual(db, null, "db should not be null");
		assert.equal(db.databaseName, "get-productive");

		db.close();

		done();
	}));
});