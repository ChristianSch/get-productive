var request = require('supertest'),
    express = require('express'),
    w3c = require('w3c-validate').createValidator();

var app = require('../app').app;

describe('validation of "/"', function() {
    it('should not have html errors', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                w3c.validate(res.text, done);
            });
    });
});

describe('validation of 404', function() {
    it('should not have html errors', function(done) {
        request(app)
            .get('/foo')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                w3c.validate(res.text, done);
            });
    });
});
