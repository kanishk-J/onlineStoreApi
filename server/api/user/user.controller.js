'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config');
var jwt = require('jsonwebtoken');

/**
 * @api {get} /api/users/ ShowUsers
 * @apiParam {String} access-token Authentication token of user
 * @apiDescription User must be authenticated and have admin privileges
 * @apiVersion 0.0.1
 * @apiName GetUsers
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -i http://localhost:4000/api/users/
 * @apiSuccess {Object[]} users List of users
 * @apiSuccessExample {Object[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          hasError: 0,
 *          users: [
 *                    {
 *                        "_id": "59fc8d8d1db0304174ef63b9",
 *                        "name": "Kanishk Jain",
 *                        "email": "kanishkjain071993@gmail.com",
 *                        "status": "Innovating the world",
 *                        "DOB": "10/07/1993",
 *                        "role": "admin",
 *                        "provider": "local"
 *                    },
 *                    {
 *                        "_id": "59fc8d8d1db0304174ef63b0",
 *                        "name": "Paranjay Gulati",
 *                        "email": "paran.gulati@gmail.com",
 *                        "status": "Living the digital revolution",
 *                        "DOB": "09/15/1993",
 *                        "role": "user",
 *                        "provider": "local"
 *                    }
 *            ]
 *      }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} UserNotFoundError User not found.
 * @apiError (Error 403) {Object} UnauthorizedError Unauthorized user
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) 
        return handleError(res, err);
    res.status(200).json({hasError: 0, users: users});
  });
};

/**
 * @api {post} /api/users/ CreateUser
 * @apiVersion 0.0.1
 * @apiName CreateUser
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/users/
 * 
 * @apiParam (Body) {String} name User's name
 * @apiParam (Body) {String} email User's email
 * @apiParam (Body) {String} password User's password
 * @apiParam (Body) {String} status User's status [optional]
 * @apiParam (Body) {String} DOB User's date of birth [optional]
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiParamExample {json} Request-Sample:
 *    {
 *        "name" : "Kanishk Jain",
 *        "email": "kanishkjain071993@gmail.com",
 *        "password": "kanishk"
 *    }
 * @apiSuccess {String} name user's name
 * @apiSuccess {String} email user's email
 * @apiSuccess {String} status user's status, if any
 * @apiSuccess {String} DOB user's date of birth
 * @apiSuccess {String} role user's role
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 500) {Object} ValidationError Validation errors in user profile.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Server Error
 * {
 *     "hasError": 1,
 *     "errorGroup": "ValidationError",
 *     "errorName": "ValidationError",
 *     "validations": [
 *        "email": "email is required",
 *        "name": "name is required"
 *     ],
 *     "message": "User validation failed"
 * }   
 * @apiError (Error 403) {Object} UnauthorizedError Unauthorized user
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }
 */

exports.create = function (req, res, next) {
  console.log('create');
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return handleError(res, err);
    var token = jwt.sign({_id: user._id }, config.secret, { expiresIn : 60*60*24 });
    res.json({ token: token });
  });
};

/**
 * @api {post} /api/users/addAdminUser CreateAdmin
 * @apiDescription Create a new admin user (User must be authenticated and have admin privileges)
 * @apiParam {String} access-token Authentication token of user
 * @apiVersion 0.0.1
 * @apiName Add admin user
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/users/addAdminUser
 * 
 * @apiParam (Body) {String} name User's name
 * @apiParam (Body) {String} email User's email
 * @apiParam (Body) {String} password User's password
 * @apiParam (Body) {String} status User's status [optional]
 * @apiParam (Body) {String} DOB User's date of birth [optional]
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiParamExample {json} Request-Sample:
 *    {
 *        "name" : "Kanishk Jain",
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
 * @apiError (Error 500) {Object} ValidationError Validation errors in user profile.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Server Error
 * {
 *     "hasError": 1,
 *     "errorGroup": "ValidationError",
 *     "errorName": "ValidationError",
 *     "validations": [
 *        "email": "email is required",
 *        "name": "name is required"
 *     ],
 *     "message": "User validation failed"
 * }  
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */

exports.addAdminUser = function (req, res) {

    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'admin';
    newUser.save(function(err, user) {
      if (err) return handleError(res, err);
      var token = jwt.sign({_id: user._id }, config.secret, { expiresIn : 60*60*24 });
      res.json({ token: token });
    });
}

/**
 * @api {get} /api/users/:id FindUser
 * @apiVersion 0.0.1
 * @apiName Find User
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -X GET http://localhost:4000/api/users/59fc9d144116f409f4e4ef42
 * 
 * @apiParam (Url Param) {String} id string id of user
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccess {String} name user's name
 * @apiSuccess {String} email user's email
 * @apiSuccess {String} status user's status, if any
 * @apiSuccess {String} DOB user's date of birth
 * @apiSuccess {String} role user's role
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "59fc8d8d1db0304174ef63b9",
 *        "name": "Kanishk Jain",
 *        "email": "kanishkjain071993@gmail.com",
 *        "DOB": "10/07/1993",
 *        "status": "Innovating the world",
 *        "role": "admin"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} UserNotFoundError User does not exists in database.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Server Error
 * {
 *     "hasError": 1,
 *     "errorGroup": "UserNotFoundError",
 *     "errorName": "UserNotFoundError",
 *     "message": "user does not exists"
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }   
 */

exports.show = function (req, res) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return handleError(res, err);
    if (!user) return handleError(req, {name: 'UserNotFoundError', message: "User does not exists"}, 404);
    res.status(200).json(user.profile);
  });
};

/**
 * @api {delete} /api/users/:id DeleteUser
 * @apiVersion 0.0.1
 * @apiName Delete User profile
 * @apiGroup User
 * @apiDescription User must be authenticated with admin privileges
 * @apiExample {curl} Example Usage:
 *    curl -X Delete http://localhost:4000/api/users/59fc9d144116f409f4e4ef42
 * 
 * @apiParam (Url Param) {String} id String id of user to be deleted
 *  
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "success",
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} UserNotFoundError User does not exists in database.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Server Error
 * {
 *     "hasError": 1,
 *     "errorGroup": "UserNotFoundError",
 *     "errorName": "UserNotFoundError",
 *     "message": "user not found"
 * } 
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }  
 */

exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return handleError(res, err);
    return res.status(200).json({message: 'success'});
  });
};

/**
 * @api {get} /api/users/me FetchProfile
 * @apiVersion 0.0.1
 * @apiName Get User profile
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -X GET http://localhost:4000/api/users/me?access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o
 * 
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccess {String} name user's name
 * @apiSuccess {String} email user's email
 * @apiSuccess {String} status user's status, if any
 * @apiSuccess {String} DOB user's date of birth
 * @apiSuccess {String} role user's role
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "59fc8d8d1db0304174ef63b9",
 *        "name": "Kanishk Jain",
 *        "email": "kanishkjain071993@gmail.com",
 *        "DOB": "10/07/1993",
 *        "status": "Innovating the world",
 *        "role": "admin"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} UserNotFoundError User does not exists in database.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Server Error
 * {
 *     "hasError": 1,
 *     "errorGroup": "UserNotFoundError",
 *     "errorName": "UserNotFoundError",
 *     "message": "user does not exist"
 * }  
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 Server Error
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */

exports.me = function(req, res) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) {
    if (err) return handleError(res, err);
    if (!user) return handleError(res, {name: 'UserNotFoundError', message: "User does not exists"}, 404);
    res.json(user);
  });
};

function handleError(res, err, errorCode) {
    errorCode = errorCode || 500;
    if(typeof err == 'string') {
        res.status(errorCode).json({hasError: 1, errorGroup: 'TechnicalError', errorName: 'UnknownError', message: err}); 
    } else {
        if(err.name == 'ValidationError' && err.errors) {
            var validations = [];
            _.forEach(err.errors, function(error, field) {
                validations.push({field: field, message: error.message})
            });
            res.status(errorCode).json({hasError: 1, errorGroup: 'ValidationError', errorName: err.name, validations: validations, message: err._message}); 
        } else if(err.name == 'UserNotFoundError') {
            res.status(errorCode).json({hasError: 1, errorGroup: err.name, errorName: err.name, message: err.message}); 
        } else {
            res.status(errorCode).json({hasError: 1, errorGroup: 'TechnicalError', errorName: err.name, message: err.message});
        }
    }
}
