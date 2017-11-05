'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secret});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function isAuthenticated () {
  return compose()
    .use(function(req, res, next) {
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        req.user = user;
        next();
      });
    });
}

function isAdmin () {
    
    return compose()
          .use(isAuthenticated())
          .use(function meetsRequirements(req, res, next) {
              if (req.user.role == 'admin') {
                  next();
              }
              else {
                  res.send(403);
              }
          });
}

function setup (User) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};

function authenticate (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

    var token = signToken(user._id);
    res.json({token: token});
  })(req, res, next)
}

function signToken(id) {
  return jwt.sign({ _id: id }, config.secret, { expiresIn : 60*60*24 });
}

exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.setup = setup;

/**
 * @api {post} /authentication Authentication
 * @apiVersion 0.0.1
 * @apiName Authentication
 * @apiDescription This api takes email and password as input and retrieves a new access token for user. This access token will further be used to interact with different APIs.
 * @apiGroup Authentication
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/authentication
 * 
 * @apiParam (Body) {String} email User's email
 * @apiParam (Body) {String} password User's password
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiParamExample {json} Request-Sample:
 *    {
 *        "email": "kanishkjain071993@gmail.com",
 *        "password": "kanishk"
 *    }
 * 
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any. 
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }
 * 
 */
exports.authenticate = authenticate;