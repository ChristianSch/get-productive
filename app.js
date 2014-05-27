var express = require('express'),
	exphbs  = require('express3-handlebars'),
	path = require('path');

var app = express();

/* Handlebars Layouts */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* Caching in productive environment */
app.enable('view cache');

/* static stuff like css, js with static middleware */
app.use("/public", express.static(__dirname + '/public'));

/* error handling */
// TODO

/* form data parsing from post request */
app.use(express.urlencoded());

/* routes */
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);