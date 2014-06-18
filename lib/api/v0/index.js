var express = require('express'),
    app = module.exports = express(),
    timeLib = require(process.env.NODE_PATH + '/public/js/lib/time.js'),
    Session = require(process.env.NODE_PATH + '/models/Session.js')(process.env.MONGODB_URI, "get-productive");

/* >>>>> API <<<<< */
app.post('/api/v0/add_session', function(req, res) {
    var start = req.param('start');
    var end = req.param('end');

    if (timeLib.isValidDate(new Date(parseInt(start))) &&
        timeLib.isValidDate(new Date(parseInt(end)))) {
        Session.addSession(start, end, function(err) {
            if (err) {
                console.log(err);
                res.statusCode = 500;

            } else {
                res.statusCode = 200;
                res.send(req.body);
            }
        });

    } else {
        res.statusCode = 400;
        res.send("Invalid time");
    }
});

app.get('/api/v0/list_sessions', function(req, res) {
    Session.listSessions(function(err, items) {
        if (err) {
            res.statusCode = 500;
            console.log(err.message);

        } else {
            res.statusCode = 200;
            res.send(items);
        }
    });
});