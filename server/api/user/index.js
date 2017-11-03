'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config');
var auth = require('../../authentication/authentication.controller');

var router = express.Router();

router.get('/', auth.isAdmin(), controller.index);
router.delete('/:id', auth.isAdmin(), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/addAdminUser', auth.isAdmin(), controller.addAdminUser);

module.exports = router;
