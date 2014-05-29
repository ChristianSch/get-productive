var request = require('supertest'),
    express = require('express');

var app = require('../app').app;

/*
describe('POST /api/add_session', function() {
    it('', function(done) {
        request(app)
        .post('/api/add_session')
        .expect(200)
        .end(function(err, res) {
           if (err) return done(err);
           done();
       });
    });
});*/

describe('GET /api/list_sessions', function() {
    it('response with valid JSON', function(done) {
        request(app)
            .get('/api/list_sessions')
            .expect(200, done);
    });
});
