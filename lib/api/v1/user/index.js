var express = require('express'),
    app = module.exports = express(),
    crud = require('./crud');

/**
 * Get user information without sensible data
 * @param  {Object} user User as returned by database
 * @return {Object}      Cleaned up user information
 */
function getSafeUserDescription(user) {
    return ({
        "_id": user._id,
        "local": {
            "name": user.local.name,
            "mail": user.local.mail
        }
    });
}

/**
 * @apiSuccessTitle (200) 200 OK
 * @apiSuccessTitle (201) 201 Created
 *
 * @apiErrorTitle (400) 400 Bad Request
 * @apiErrorTitle (404) 404 Not Found
 * @apiErrorTitle (422) 422 Unprocessable Entity
 *
 */
/** @apiDefineErrorStructure UserNotFoundError
 *
 * @apiError (404 Not Found) UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

app.get('/api/v1/user', function(req, res) {
    res.status = 200;
    res.send({
        "_links": {}
    });
});

/**
 * @api {get} /api/v1/user/:id Request user information
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiParam {String} id Users unique id
 *
 * @apiSuccess (200) {String} _id User id
 * @apiSuccess (200) {Object} local Local user information
 * @apiSuccess (200) {String} local.name User name
 * @apiSuccess (200) {String} local.mail User mail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "539f4ec4debc120000dd9ab6",
 *         "local": {
 *             "name": "JohnDoe",
 *             "mail": "foobar@dieter.de"
 *         }
 *     }
 *
 * @apiError (422) NoValidID ID is not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "error": "NoValidID"
 *     }
 *
 * @apiErrorStructure UserNotFoundError
 */
app.get('/api/v1/user/:id', function(req, res) {
    crud.retrieveUser({
        '_id': req.params.id
    }, function(err, doc) {
        if (err) {
            if (err.name === "CastError" && err.type === "ObjectId") {
                console.log("422 GET");
                res.statusCode = 422;
                res.send({
                    "error": "NoValidID"
                });
            } else {
                console.log("500 GET");
                res.statusCode = 500;
                res.send({
                    "error": err
                });
            }
        }

        if (!doc) {
            res.statusCode = 404;
            res.send({
                "error": "UserNotFound"
            });
        } else {
            res.statusCode = 200;
            res.send(getSafeUserDescription(doc));
        }
    });
});

/**
 * @api {put} /api/v1/user/:id Change user information
 * @apiName PutUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiParam {String} id Users unique id
 *
 * @apiSuccess (200) {String} _id User id
 * @apiSuccess (200) {Object} local Local user information
 * @apiSuccess (200) {String} local.name User name
 * @apiSuccess (200) {String} local.mail User mail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "539f4ec4debc120000dd9ab6",
 *         "local": {
 *             "name": "JohnDoe",
 *             "mail": "foobar@dieter.de"
 *         }
 *     }
 *
 * @apiError (400) NotEnoughData Missing data
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": "NotEnoughData"
 *     }
 *
 * @apiError (422) NoValidID ID is not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "error": "NoValidID"
 *     }
 *
 * @apiErrorStructure UserNotFoundError
 */
app.put('/api/v1/user/:id', function(req, res) {
    var validRequest = false;
    var newData = {};

    if (req.body.name) {
        newData["local.name"] = req.body.name;
        validRequest = true;
    }

    if (req.body.mail) {
        newData["local.mail"] = req.body.mail;
        validRequest = true;
    }

    if (req.body.password) {
        newData["local.password"] = User.generateHash(req.body.password);
        validRequest = true;
    }

    if (validRequest === true) {
        crud.updateUser({
                '_id': req.params.id
            }, newData,
            function(err, doc) {
                if (err) {
                    if (err.name === "CastError" && err.type === "ObjectId") {
                        console.log("422 PUT");
                        // res.statusCode = 422;
                        res.send({
                            "error": "NoValidID"
                        });
                    } else {
                        console.log("500 PUT");
                        res.statusCode = 500;
                        res.send({
                            "error": err
                        });
                    }
                }

                if (!doc) {
                    res.statusCode = 404;
                    res.send({
                        "error": "UserNotFound"
                    });
                } else {
                    res.statusCode = 200;
                    res.send(getSafeUserDescription(doc));
                }
            });
    } else {
        res.statusCode = 400;
        res.send({
            "error": "NotEnoughData"
        });
    }
});

/**
 * @api {post} /api/v1/user Create new user
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiParam {String} name Name of user
 * @apiParam {String} mail Mail address of user
 * @apiParam {String} password Cleartext password of user
 *
 * @apiSuccess (201) {String} _id User id
 * @apiSuccess (201) {Object} local Local user information
 * @apiSuccess (201) {String} local.name User name
 * @apiSuccess (201) {String} local.mail User mail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *          "_id": "53a0be0561a95fa217f3a4ee",
 *          "local": {
 *              "name": "hans",
 *              "mail": "foo@bar.de"
 *          }
 *     }
 *
 * @apiError (422) UserNameTaken The user name is already taken
 * @apiError (400) MissingData Not enough data provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "error": "UserNameTaken"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Missing Data"
 *     }
 *
 */
app.post('/api/v1/user', function(req, res) {
    if (req.body.name !== undefined && req.body.mail !== undefined && req.body.password !== undefined) {
        var newUser = {
            "local": {
                "name": req.body.name,
                "mail": req.body.mail,
                "password": req.body.password
            }
        };

        crud.createUser(newUser, function(err, doc) {
            if (err) {
                res.statusCode = 500;
                res.send({
                    "error": err
                });
            }
            /* only assuming here */
            res.statusCode = 201;
            res.send(getSafeUserDescription(doc));
        });
    } else {
        res.statusCode = 400;
        res.send({
            "error": "MissingData"
        });
    }
});

/**
 * @api {delete} /api/v1/user Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 0.0.1
 *
 * @apiParam {String} id Users unique id.
 *
 * @apiSuccess (200) {String} _id User id
 * @apiSuccess (200) {Object} local Local user information
 * @apiSuccess (200) {String} local.name User name
 * @apiSuccess (200) {String} local.mail User mail
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "539f4ec4debc120000dd9ab6",
 *         "local": {
 *             "name": "JohnDoe",
 *             "mail": "foobar@dieter.de"
 *         }
 *     }
 *
 * @apiError (422) NoValidID ID is not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "error": "NoValidID"
 *     }
 *
 * @apiErrorStructure UserNotFoundError
 */
app.delete('/api/v1/user/:id', function(req, res) {
    crud.deleteUser({
        "_id": req.params.id
    }, function(err, doc) {
        if (err) {
            if (err.name === "CastError" && err.type === "ObjectId") {
                res.statusCode = 422;
                res.send({
                    "error": "NoValidID"
                });
            } else {
                res.statusCode = 500;
                res.send({
                    "error": err
                });
            }
        }

        if (!doc) {
            res.statusCode = 404;
            res.send({
                "error": "UserNotFound"
            });
        }
        res.statusCode = 200;
        res.send(getSafeUserDescription(doc));
    });
});

/*
	Add user dependend session. Returns session.
 */
app.post('/api/v1/user/:id/session', function(req, res) {
    /* TODO */
});

/*
	Return all sessions for a user in a specified format. Defaults to csv.
	Available formats: JSON, CSV
 */
app.get('/api/v1/user/:id/export/:format', function(req, res) {
    /* TODO */
});
