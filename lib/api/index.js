var express = require('express'),
    app = module.exports = express(),
    timeLib = require(process.env.NODE_PATH + '/public/js/lib/time.js'),
    v1 = require('./v1');

app.configure(function() {
    app.use(v1); /* API version 1 */
});
