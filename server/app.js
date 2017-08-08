'use strict'

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var config = require('./config');
var mongoose = require('mongoose');
var session = require('express-session');

var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({secret: config.secret}));

app.use('/authentication', require('./authentication'));
app.use('/api/users', require('./api/user'));

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

server.listen(config.port, function () {
    console.log('server listening at port ' + config.port);
});