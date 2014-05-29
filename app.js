var express = require('express'),
    exphbs  = require('express3-handlebars'),
    path = require('path'),
    timeLib = require(__dirname + '/public/js/lib/time.js');

var Session = require(__dirname + '/models/Session.js')(process.env.MONGODB_URI, "get-productive");

var app = exports.app = express();

/* Handlebars Layouts */
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

/* Caching in productive environment */
app.enable('view cache');

/* static stuff like css, js with static middleware */
app.use("/public", express.static(__dirname + '/public'));

/* form data parsing from post request */
app.use(express.urlencoded());

/* routes */
app.get('/', function (req, res) {
    res.render('home', { title: 'Get Productive!'});
});
/* >>>>> API <<<<< */
app.post('/api/add_session', function(req, res) {
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

app.get('/api/list_sessions', function(req, res) {
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

/* >>>>> error handling <<<<< */
// see: https://github.com/visionmedia/express/blob/master/examples/error-pages/index.js

app.get('/404', function(req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
  next();
});

app.get('/403', function(req, res, next){
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function(req, res, next){
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('error', { title: "404 - Not found", error: "Not found: '" + req.url + "'.", error_num: 404 });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
       res.send({ error: 'Not found: ' + req.url });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found: ' + req.url);
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('error', { error: err, error_num: 500 });
});


app.listen(7600);