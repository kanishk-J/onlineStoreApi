var app = require('./express');
var server = require('http').createServer(app);

var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

server.listen(config.port, function () {
    console.log('server listening at port ' + config.port);
});

module.exports = server;