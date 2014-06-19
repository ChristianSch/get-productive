var express = require('express'),
    app = module.exports = express(),
    user = require('./user');

app.configure(function() {
    app.use(user);
});
