'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config');
var auth = require('../../authentication/authentication.controller');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
