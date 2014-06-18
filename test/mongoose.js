var mongoose = require('mongoose'),
    User = require(process.env.NODE_PATH + '/models/user'),
    should = require('chai').should,
    assert = require('chai').assert,
    crud = require(process.env.NODE_PATH + '/lib/api/v1/user/crud');

before(function() {
    /* mongoose.connect(process.env.DB_URI); */
});

describe('CRUD a user', function() {
    var testUser = {
        "local": {
            "name": "JohnDoe",
            "mail": "quicks@quacks.com",
            "password": "foobar"
        }
    };

    var newmail = "foo@bar.to";

    it('should insert a user', function(done) {
        crud.createUser(testUser, function(err) {
            if (err) throw err;
            else done();
        });
    });

    it('should update the user data', function(done) {
        crud.updateUser({
            "local.name": testUser.local.name
        }, {
            "local.mail": newmail
        }, function(err, doc) {
            if (err) throw err;
            else {
                assert.notEqual(doc, null, "returned document should not be null");
                assert.equal(doc.local.name, testUser.local.name);
                assert.equal(doc.local.mail, newmail);
                done();
            }
        });
    });

    it('should retrieve the user information', function(done) {
        crud.retrieveUser({
            "local.name": testUser.local.name
        }, function(err, doc) {
            if (err) throw err;
            else {
                assert.notEqual(doc, null, "returned document should not be null");
                assert.equal(doc.local.name, testUser.local.name);
                assert.equal(doc.local.mail, newmail);
                done();
            }
        });
    });

    it('should remove the user', function(done) {
        crud.deleteUser({
            "local.name": testUser.local.name
        }, function(err, doc) {
            if (err) throw err;
            assert.notEqual(doc, null, "returned document should not be null");
            done();
        });
    });
});
