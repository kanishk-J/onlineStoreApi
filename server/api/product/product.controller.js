'use strict'

var Product = require('./product.model');
var _ = require('lodash');

/**
 * @api {get} /api/products/ ShowProducts
 * @apiParam {String} access-token Authentication token of user
 * @apiDescription User must be authenticated
 * @apiVersion 0.0.1
 * @apiName GetProducts
 * @apiGroup Product
 * @apiExample {curl} Example Usage:
 *    curl -i http://localhost:4000/api/products/
 * @apiSuccess {Object[]} products List of products
 * @apiSuccessExample {Object[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          hasError: 0,
 *          products: [
 *                    {
 *                        "_id": "59fc8d8d1db0304174ef63b9",
 *                        "name": "Motorola Moto G5 plus",
 *                        "description": "Motorola mobile phone",
 *                        "productCode": "1101",
 *                        "images": [],
 *                        "price": "15000",
 *                        "qtyInStock": "15"
 *                    },
 *                    {
 *                        "_id": "59fc8d8d1db0304174ef63b0",
 *                        "name": "Apple iPhone X",
 *                        "description": "Apple's new i phone",
 *                        "productCode": "1116",
 *                        "images": [],
 *                        "price": 82999,
 *                        "qtyInStock": 20
 *                    }
 *            ]
 *      }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} ProductNotFoundError Product not found.
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * 
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */

exports.index = function (req, res) {
    Product.find().lean().exec(function (err, products) {
        if(err)
            return handleError(res, err);
        return res.status(200).json({hasError: 0, products: products});
    });
}

/**
 * @api {get} /api/products/findById/:id FindProductById
 * @apiVersion 0.0.1
 * @apiName Find Product By Id
 * @apiGroup Product
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/products/findById/59fc9d144116f409f4e4ef42
 * 
 * @apiParam (Url Param) {String} id string id of product
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccess {String} name product's name
 * @apiSuccess {String} description product's description
 * @apiSuccess {String} productCode product's code
 * @apiSuccess {String[]} images products's images
 * @apiSuccess {String} price product's price
 * @apiSuccess {String} qtyInStock product's available quantity in stock
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "59fc8d8d1db0304174ef63b9",
 *        "name": "Motorola Moto G5 plus",
 *        "description": "Motorola mobile phone",
 *        "productCode": "1101",
 *        "images": [],
 *        "price": "15000"
 *        "qtyInStock": "15"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} ProductNotFoundError Product does not exists in database.
 * @apiErrorExample {json} Error-Response 404:
 * HTTP/1.1 404 Not Found
 * {
 *     "hasError": 1,
 *     "errorGroup": "ProductNotFoundError",
 *     "errorName": "ProductNotFoundError",
 *     "message": "product does not exists"
 * }
 * 
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }   
 */
exports.findById = function (req, res) {
    var id = req.params.id;
    Product.findOne({_id: id}).lean().exec(function (err, product) {
        if(err)
            return handleError(res, err);
        if(!product)
            return handleError(res, {name: "ProductNotFoundError", message: "product does not exist"}, 404);
        return res.status(200).json(product);
    });
}

/**
 * @api {get} /api/products/findByName/:name FindProductByName
 * @apiVersion 0.0.1
 * @apiName Find Product By Name
 * @apiGroup Product
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/products/findByName/Motorola Moto G5 plus
 * 
 * @apiParam (Url Param) {String} name name of product
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccess {String} name product's name
 * @apiSuccess {String} description product's description
 * @apiSuccess {String} productCode product's code
 * @apiSuccess {String[]} images products's images
 * @apiSuccess {String} price product's price
 * @apiSuccess {String} qtyInStock product's available quantity in stock
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {  
 *        "_id": "59fc8d8d1db0304174ef63b9",
 *        "name": "Motorola Moto G5 plus",
 *        "description": "Motorola mobile phone",
 *        "productCode": "1101",
 *        "images": [],
 *        "price": "15000"
 *        "qtyInStock": "15"
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} ProductNotFoundError Product does not exists in database.
 * @apiErrorExample {json} Error-Response 404:
 * HTTP/1.1 404 Not Found
 * {
 *     "hasError": 1,
 *     "errorGroup": "ProductNotFoundError",
 *     "errorName": "ProductNotFoundError",
 *     "message": "product does not exists"
 * }
 * 
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }   
 */

exports.findByName = function (req, res) {
    var name = req.params.name;
    Product.findOne({name: name}).lean().exec(function (err, product) {
        if(err)
            return handleError(res, err);
        if(!product)
            return handleError(res, {name: "ProductNotFoundError", message: "product does not exist"}, 404);
        return res.status(200).json(product);
    });
}

/**
 * @api {get} /api/products/search SearchProducts
 * @apiParam {String} access-token Authentication token of user
 * @apiDescription Search product via name or product code.
 * @apiVersion 0.0.1
 * @apiName Search Products via name of product code
 * @apiGroup Product
 * @apiExample {curl} Example Usage:
 *    curl -i http://localhost:4000/api/products/search?q=moto
 * @apiParam (Query String) {string} q product name or product code
 * @apiSuccess {Object[]} products List of products
 * @apiSuccessExample {Object[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          hasError: 0,
 *          products: [
 *                    {
 *                        "_id": "59fc8d8d1db0304174ef63b9",
 *                        "name": "Motorola Moto G5 plus",
 *                        "description": "Motorola mobile phone",
 *                        "productCode": "1101",
 *                        "images": [],
 *                        "price": "15000",
 *                        "qtyInStock": "15"
 *                    }
 *            ]
 *      }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} ProductNotFoundError Product not found.
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * 
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */


exports.search = function (req, res) {
    var alphaN=req.query.q.match('^[a-zA-Z0-9_]*$');
    if(alphaN==null)
        return res.status(500).send("search query must be alpha numeric.");
    var q = new RegExp(req.query.q, 'i');
    Product.find({$or: [{name: q}, {productCode: q}]}).lean().exec(function (err, products) {
        if(err)
            return handleError(res, err);
        return res.status(200).json(products);
    });
}

/**
 * @api {post} /api/products/ AddProduct
 * @apiDescription Create a new product (User must be authenticated and have admin privileges)
 * @apiParam {String} access-token Authentication token of user
 * @apiVersion 0.0.1
 * @apiName Add admin user
 * @apiGroup Product
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/products/
 * 
 * @apiParam (Body) {String} name product name
 * @apiParam (Body) {String} description description of product [optional]
 * @apiParam (Body) {String} productCode product code
 * @apiParam (Body) {String} images product images [optional]
 * @apiParam (Body) {String} price Product selling price
 * @apiParam (Body) {String} qtyInStock Product in stock quantity
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiParamExample {json} Request-Sample:
 *    {
 *        "name" : "Motorola Moto G.5 plus",
 *        "description": "Mmotorola mobile phone",
 *        "images": [],
 *        "productCode": 1101,
 *        "price": 15000,
 *        "qtyInStock": 15
 *    }
 * 
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "59fc8d8d1db0304174ef63b9", 
 *        "name" : "Motorola Moto G.5 plus",
 *        "description": "Mmotorola mobile phone",
 *        "images": [],
 *        "productCode": 1101,
 *        "price": 15000,
 *        "qtyInStock": 15
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 500) {Object} ValidationError Validation errors in user profile.
 * @apiErrorExample {json} Error-Response 500:
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
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */

exports.create = function (req, res) {
    var product = new Product(req.body);
    product.save(function (err) {
        if(err)
            return handleError(res, err);
        return res.status(200).json(product);
    }); 
}

/**
 * @api {post} /api/products/:id UpdateProduct
 * @apiDescription update a product (User must be authenticated and have admin privileges)
 * @apiParam {String} access-token Authentication token of user
 * @apiVersion 0.0.1
 * @apiName Add admin user
 * @apiGroup User
 * @apiExample {curl} Example Usage:
 *    curl -X POST http://localhost:4000/api/products/59fc8d8d1db0304174ef63b9
 * 
 * @apiParam (Body) {String} name product name
 * @apiParam (Body) {String} description description of product
 * @apiParam (Body) {String} productCode product code
 * @apiParam (Body) {String} images product images
 * @apiParam (Body) {String} price Product selling price
 * @apiParam (Body) {String} qtyInStock Product in stock quantity
 * 
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiParamExample {json} Request-Sample:
 *    {
 *        "_id": "59fc8d8d1db0304174ef63b9",
 *        "name" : "Motorola Moto G.5 plus",
 *        "description": "Mmotorola mobile phone",
 *        "images": [],
 *        "productCode": 1101,
 *        "price": 13999,
 *        "qtyInStock": 12
 *    }
 * 
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "59fc8d8d1db0304174ef63b9", 
 *        "name" : "Motorola Moto G.5 plus",
 *        "description": "Mmotorola mobile phone",
 *        "images": [],
 *        "productCode": 1101,
 *        "price": 13999,
 *        "qtyInStock": 12
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 500) {Object} ValidationError Validation errors in user profile.
 * @apiErrorExample {json} Error-Response 500:
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
 * @apiError (Error 404) {Object} ProductNotFoundError product does not exists in database.
 * @apiErrorExample {json} Error-Response 404:
 * HTTP/1.1 404 Not Found
 * {
 *     "hasError": 1,
 *     "errorGroup": "ProductNotFoundError",
 *     "errorName": "ProductNotFoundError",
 *     "message": "product not found"
 * }
 * 
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    } 
 */

exports.update = function (req, res) {
    var id = req.params.id;
    Product.findOne({_id: id}).exec(function (err, product) {
        if(err)
            return handleError(res, err);
        if(!product)
            return handleError(res, {name: "ProductNotFoundError", message: "Product does not exist"}, 404);
        var updated = _.extend(product, req.body);
        updated.save(function (err) {
            if(err)
                return handleError(res, err);
            return res.status(200).json(updated);
        });
    });
}

/**
 * @api {delete} /api/products/:id DeleteProduct
 * @apiVersion 0.0.1
 * @apiName Delete Product
 * @apiGroup Product
 * @apiDescription User must be authenticated with admin privileges
 * @apiExample {curl} Example Usage:
 *    curl -X Delete http://localhost:4000/api/products/59fc9d144116f409f4e4ef42
 * 
 * @apiParam (Url Param) {String} id String id of product to be deleted
 *  
 * @apiParam (Query String) {String} access-token Authentication token of user
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "success",
 *     }
 * @apiError (Error 500) {Object} TechnicalError Technical errors if any.
 * @apiError (Error 404) {Object} ProductNotFoundError product does not exists in database.
 * @apiErrorExample {json} Error-Response 404:
 * HTTP/1.1 404 Not Found
 * {
 *     "hasError": 1,
 *     "errorGroup": "ProductNotFoundError",
 *     "errorName": "ProductNotFoundError",
 *     "message": "product not found"
 * } 
 
 * @apiError (Error 401) {Object} UnauthorizedError Unauthorized user
 * @apiErrorExample {json} Error-Response 401:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *        "hasError": 1,
 *        "errorGroup": "UnauthorizedError",
 *        "errorName": "UnauthorizedError",
 *        "message": "No authorization token was found"
 *    }  
 */

exports.delete = function (req, res) {
    var id = req.params.id;
    Product.remove({_id: id}, function (err) {
        if(err)
            return handleError(res, err);
        return res.status(200).json({message: 'success'});
    });
}

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
        } else if(err.name == 'ProductNotFoundError') {
            res.status(errorCode).json({hasError: 1, errorGroup: err.name, errorName: err.name, message: err.message});
        } else {
            res.status(errorCode).json({hasError: 1, errorGroup: '', errorName: err.name, message: err.message});
        }
    }
}