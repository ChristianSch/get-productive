var request = require('supertest'),
    express = require('express'),
    assert = require('chai').assert;

var app = require(process.env.NODE_PATH + "").app;

var testUser = {
    "name": "foobar",
    "mail": "foo@bar.com",
    "password": "root"
};

describe('POST /api/v1/user', function() {
    it('should return status 400', function(done) {
        request(app)
            .post('/api/v1/user')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return status 400', function(done) {
        request(app)
            .post('/api/v1/user')
            .expect(400)
            .send({
                "name": testUser.name,
                "mail": testUser.mail
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return status 400', function(done) {
        request(app)
            .post('/api/v1/user')
            .expect(400)
            .send({
                "name": testUser.name,
                "password": testUser.password
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should return status 400', function(done) {
        request(app)
            .post('/api/v1/user')
            .expect(400)
            .send({
                "mail": testUser.mail,
                "password": testUser.password
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return 201: CREATED', function(done) {
        request(app)
            .post('/api/v1/user')
            .expect(201)
            .send({
                "name": testUser.name,
                "mail": testUser.mail,
                "password": testUser.password
            })
            .end(function(err, res) {
                if (err) return done(err);
                var doc = res.body;
                testUser.id = doc._id;

                /* should test for valid hash instead of differences */
                assert.notEqual(doc, null, "returned document should not be null");
                assert.equal(doc.local.name, testUser.name);
                assert.equal(doc.local.mail, testUser.mail);

                done();
            });
    });
});

describe('GET /api/v1/user', function() {
    it('should return status 422', function(done) {
        request(app)
            .get('/api/v1/user/thisisnoid')
            .expect(422)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return status 404', function(done) {
        request(app)
            .get('/api/v1/user/000000000000000000000000')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return status 200', function(done) {
        request(app)
            .get('/api/v1/user/' + testUser.id)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.notEqual(res, null, "returned document should not be null");
                done();
            });
    });
});

describe('PUT /api/v1/user', function() {
    it('should return status 422', function(done) {
        request(app)
            .put('/api/v1/user/thisisnoid')
            .expect(422)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return status 404', function(done) {
        request(app)
            .put('/api/v1/user/000000000000000000000000')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return 200 and should\'ve changed only the name', function(done) {
        testUser.name = "barfoo";
        request(app)
            .put('/api/v1/user/' + testUser.id)
            .expect(200)
            .send({
                "name": testUser.name
            })
            .end(function(err, res) {
                if (err) return done(err);

                var doc = res.body;

                assert.equal(doc.local.name, testUser.name, "name should've been changed");
                assert.equal(doc.local.mail, testUser.mail, "mail should remain unchanged");

                done();
            });
    });
    it('should return 200 and should\'ve changed only the mail', function(done) {
        testUser.mail = "bar@foo.xl";
        request(app)
            .put('/api/v1/user/' + testUser.id)
            .expect(200)
            .send({
                "mail": testUser.mail
            })
            .end(function(err, res) {
                if (err) return done(err);

                var doc = res.body;
                testUser.id = doc._id;

                assert.equal(doc.local.name, testUser.name, "name should remain unchanged");
                assert.equal(doc.local.mail, testUser.mail, "mail should've been changed");

                done();
            });
    });
});

describe('DELETE /api/v1/user', function() {
    it('should return status 422', function(done) {
        request(app)
            .delete('/api/v1/user/thisisnoid')
            .expect(422)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return status 404', function(done) {
        request(app)
            .delete('/api/v1/user/000000000000000000000000')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
