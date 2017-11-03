'use strict'

'use strict';

var express = require('express');
var controller = require('./product.controller');
var config = require('../../config');
var auth = require('../../authentication/authentication.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/search', auth.isAuthenticated(), controller.search);
router.get('/findById/:id', auth.isAuthenticated(), controller.findById);
router.get('/findByName/:name', auth.isAuthenticated(), controller.findByName);
router.post('/', auth.isAdmin(), controller.create);
router.post('/:id', auth.isAdmin(), controller.update);
router.delete('/:id', auth.isAdmin(), controller.delete);

module.exports = router;
