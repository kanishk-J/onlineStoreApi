'use strict'

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var config = require('./config');
var mongoose = require('mongoose');
var session = require('express-session');
var serveIndex = require('serve-index');
var path = require('path');

var express = require('express');
var app = express();
var serverPath = path.join(__dirname, '/..');
var root = path.normalize(__dirname + '/..');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({secret: config.secret}));
app.set('appPath', 'doc');

app.use('/authentication', require('./authentication'));
app.use('/api/users', require('./api/user'));
app.use('/api/products', require('./api/product'));
app.use(express.static(path.join(root, 'doc')));
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({hasError: 1, errorGroup: 'UnauthorizedError', errorName: err.name, message: err.message});
	}
});
app.use('/', serveIndex(path.resolve(serverPath), {'icons': true}));
app.route('/docs').get(function (req, res) {
    return res.sendfile(app.get('appPath') + '/index.html');
})

module.exports = app;