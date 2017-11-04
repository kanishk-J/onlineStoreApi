var app = require('./express');
var server = require('http').createServer(app);

var config = require('./config');
var mongoose = require('mongoose');
var User = require('./api/user/user.model');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

mongoose.connection.once('open', function() {
	if(config.seed) {
		var user = {
			name: 'John Doe',
			email: 'johndoe@abc.com',
			password: 'johndoe',
			status: 'Innovating the world',
			DOB: '10/07/1993'
		};
		User.update({email: user.email}, user, {upsert: true}, function (err) {
			if(err)
				throw err;
			console.log('Default user seeded to db');
			return;
		});
	}
});

server.listen(config.port, function () {
    console.log('server listening at port ' + config.port);
});

module.exports = server;