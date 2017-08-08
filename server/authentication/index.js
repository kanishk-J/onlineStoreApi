'use strict';

var express = require('express');
var User = require('../api/user/user.model');

var router = express.Router();
var controller = require('./authentication.controller');
controller.setup(User);

router.post('/', controller.authenticate);

module.exports = router;