'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    productCode: {
        type: String,
        required: true
    },
    images: [String],
    price: {
        type: Number,
        required: true
    },
    qtyInStock: {
        type: Number,
        required: true
    }
});

ProductSchema.path('name').validate(function (val, next) {
    var self = this;
    self.constructor.findOne({name: val}, function (err, product) {
        if(err)
            throw new Error(err);
        if(product) {
            if(product._id.toString() == self._id.toString())
                return next(true);
            return next(false);
        }
        return next(true);
    });
}, "A product with this name already exists in the database.");

ProductSchema.path('productCode').validate(function (val, next) {
    var self = this;
    self.constructor.findOne({productCode: val}, function(err, product) {
        if(err)
            throw new Error(err);
        if(product){
            if(self._id.toString() == product._id.toString()) {
                return next(true);
            }
            else return next(false);
        }
        return next(true);
    });
}, "A product with this product code already exists");

module.exports = mongoose.model('Product', ProductSchema);