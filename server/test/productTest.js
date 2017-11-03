//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


var mongoose = require("mongoose");
var Product = require('../api/product/product.model');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var user = {
    email: "johndoe@abc.com",
    password: "johndoe"
}

chai.use(chaiHttp);
//Our parent block
describe('Products', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/POST authenticate', () => {
      it('it should LOGIN user', (done) => {
        chai.request(server)
            .post('/authentication')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                user.token = res.body.token;
              done();
            });
      });
  });

  describe('/GET products', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
            .get('/api/products?access_token=' + user.token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('hasError');
                res.body.hasError.should.be.eql(0);
                res.body.should.have.property('products');
                res.body.products.should.be.a('array');
                res.body.products.length.should.be.eql(0);
              done();
            });
      });

      it('it should not GET products without authentication', (done) => {
        chai.request(server)
            .get('/api/products')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('hasError');
                res.body.hasError.should.be.eql(1);
                res.body.should.have.property('errorGroup');
                res.body.errorGroup.should.be.eql('UnauthorizedError');
                res.body.should.have.property('errorName');
                res.body.errorName.should.be.eql('UnauthorizedError');
                res.body.should.have.property('message');
              done();
            });
      });
  });

  describe('/POST product', () => {
      it('it should add a product to database', (done) =>  {
          var product = new Product({
              name: 'Motorola Moto G5 Plus',
              description: 'Motorola Modile Phone',
              productCode: 1101,
              images: [],
              price: 15000,
              qtyInStock: 15
          });
          chai.request(server)
                .post('/api/products?access_token=' + user.token)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.name.should.be.eql(product.name);
                    res.body.should.have.property('description');
                    res.body.description.should.be.eql(product.description);
                    res.body.should.have.property('productCode');
                    res.body.productCode.should.be.eql(product.productCode);
                    res.body.should.have.property('images');
                    res.body.should.have.property('price');
                    res.body.price.should.be.eql(product.price);
                    res.body.should.have.property('qtyInStock');
                    res.body.qtyInStock.should.be.eql(product.qtyInStock);
                    done();
                });

      });

      it('it should not add a product to database without authentication', (done) =>  {
            var product = new Product({
                name: 'Motorola Moto G5 Plus',
                description: 'Motorola Modile Phone',
                productCode: 1101,
                images: [],
                price: 15000,
                qtyInStock: 15
            });
            chai.request(server)
                    .post('/api/products')
                    .send(product)
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.property('hasError');
                        res.body.hasError.should.be.eql(1);
                        res.body.should.have.property('errorGroup');
                        res.body.errorGroup.should.be.eql('UnauthorizedError');
                        res.body.should.have.property('errorName');
                        res.body.errorName.should.be.eql('UnauthorizedError');
                        res.body.should.have.property('message');
                        done();
                    });

        });

        it('it should not add a product without name', (done) => {
            var product = new Product({
                description: 'Some random product',
                productCode: 1102,
                images: [],
                price: 15000,
                qtyInStock: 15
            });
            chai.request(server)
                .post('/api/products?access_token=' + user.token)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ValidationError');
                    res.body.should.have.property('errorName');
                    res.body.errorName.should.be.eql('ValidationError');
                    res.body.should.have.property('validations');
                    res.body.validations.should.be.a('array');
                    res.body.validations.length.should.be.eql(1);
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('it should not add a product without productCode', (done) => {
            var product = new Product({
                description: 'Some random product',
                images: [],
                price: 15000,
                qtyInStock: 15
            });
            chai.request(server)
                .post('/api/products?access_token=' + user.token)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ValidationError');
                    res.body.should.have.property('errorName');
                    res.body.errorName.should.be.eql('ValidationError');
                    res.body.should.have.property('validations');
                    res.body.validations.should.be.a('array');
                    res.body.validations.length.should.be.eql(2);
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('it should not add a product without price', (done) => {
            var product = new Product({
                description: 'Some random product',
                images: [],
                qtyInStock: 15
            });
            chai.request(server)
                .post('/api/products?access_token=' + user.token)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ValidationError');
                    res.body.should.have.property('errorName');
                    res.body.errorName.should.be.eql('ValidationError');
                    res.body.should.have.property('validations');
                    res.body.validations.should.be.a('array');
                    res.body.validations.length.should.be.eql(3);
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('it should not add a product without qtyInStock', (done) => {
            var product = new Product({
                description: 'Some random product',
                images: []
            });
            chai.request(server)
                .post('/api/products?access_token=' + user.token)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ValidationError');
                    res.body.should.have.property('errorName');
                    res.body.errorName.should.be.eql('ValidationError');
                    res.body.should.have.property('validations');
                    res.body.validations.should.be.a('array');
                    res.body.validations.length.should.be.eql(4);
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('it should not add a product with existing name', (done) => {
            var product = new Product({
                name: 'Motorola Moto E4 plus',
                description: 'Motorola Mobile Phone',
                productCode: 1102,
                price: 15000,
                qtyInStock: 15
            });

            product.save(function (err) {
                var newProduct = new Product({
                    name: 'Motorola Moto E4 plus',
                    description: 'Some product with same name',
                    productCode: 1103,
                    qtyInStock: 10,
                    price: 13000
                })

                chai.request(server)
                    .post('/api/products?access_token=' + user.token)
                    .send(newProduct)
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('hasError');
                        res.body.hasError.should.be.eql(1);
                        res.body.should.have.property('errorGroup');
                        res.body.errorGroup.should.be.eql('ValidationError');
                        res.body.should.have.property('errorName');
                        res.body.errorName.should.be.eql('ValidationError');
                        res.body.should.have.property('validations');
                        res.body.validations.should.be.a('array');
                        res.body.validations.length.should.be.eql(1);
                        res.body.should.have.property('message');
                        done();
                    });
            });
        });

        it('it should not add a product with existing productCode', (done) => {
            var product = new Product({
                name: 'Motorola Moto G5 S plus',
                description: 'Motorola Mobile Phone',
                productCode: 1104,
                price: 15000,
                qtyInStock: 15
            });

            product.save(function (err) {
                var newProduct = new Product({
                    name: 'Random New Product',
                    description: 'Some product with same name',
                    productCode: 1104,
                    qtyInStock: 10,
                    price: 13000
                })

                chai.request(server)
                    .post('/api/products?access_token=' + user.token)
                    .send(newProduct)
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('hasError');
                        res.body.hasError.should.be.eql(1);
                        res.body.should.have.property('errorGroup');
                        res.body.errorGroup.should.be.eql('ValidationError');
                        res.body.should.have.property('errorName');
                        res.body.errorName.should.be.eql('ValidationError');
                        res.body.should.have.property('validations');
                        res.body.validations.should.be.a('array');
                        res.body.validations.length.should.be.eql(1);
                        res.body.should.have.property('message');
                        done();
                    });
            });
        });
  });

  describe('/GET/findById/:id', () => {
      it('it should fetch a product by its id', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            chai.request(server)
                .get('/api/products/findById/' + product._id + '?access_token=' + user.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name');
                    res.body.name.should.be.eql(product.name);
                    res.body.should.have.property('price');
                    res.body.price.should.be.eql(product.price);
                    done();
                });
        });
      });

      it('it should not fetch a product by its id without authentication', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            chai.request(server)
                .get('/api/products/findById/' + product._id)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('UnauthorizedError');
                    done();
                });
        });
      });

      it('it should not return a product that does not exist', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            var randomId = new mongoose.Types.ObjectId();
            chai.request(server)
                .get('/api/products/findById/' + randomId + '?access_token=' + user.token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ProductNotFoundError');
                    done();
                });
        });
      });
  });

  describe('/GET/findByName/:name', () => {
      it('it should fetch a product by its name', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            chai.request(server)
                .get('/api/products/findByName/' + product.name + '?access_token=' + user.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name');
                    res.body.name.should.be.eql(product.name);
                    res.body.should.have.property('price');
                    res.body.price.should.be.eql(product.price);
                    done();
                });
        });
      });

      it('it should not fetch a product by its name without authentication', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            chai.request(server)
                .get('/api/products/findByName/' + product._id)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('UnauthorizedError');
                    done();
                });
        });
      });

      it('it should not return a product that does not exist', done => {
        var product = new Product({
            name: 'Motorola Moto E4',
            productCode: 11023,
            price: 13000,
            qtyInStock: 30
        });

        product.save(() => {
            var randomId = new mongoose.Types.ObjectId();
            chai.request(server)
                .get('/api/products/findByName/' + 'Random Product Name' + '?access_token=' + user.token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('hasError');
                    res.body.hasError.should.be.eql(1);
                    res.body.should.have.property('errorGroup');
                    res.body.errorGroup.should.be.eql('ProductNotFoundError');
                    done();
                });
        });
      });
  });

  describe('/POST/:id', () => {
      it('it should update the desired fields of the product', done => {
          var product = new Product({
              name: 'Motorola G4 Plus',
              description: 'Motorola phone',
              productCode: 110022,
              price: 10000,
              qtyInStock: 12
          });

          product.save(() => {
              var _product = {
                  name: 'Motorola G4 S Plus'
              }
              chai.request(server)
                  .post('/api/products/' + product._id + '?access_token=' + user.token)
                  .send(_product)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property('name');
                      res.body.name.should.be.eql(_product.name);
                      res.body.should.have.property('_id');
                      res.body._id.should.be.eql(product._id.toString());
                      done();
                  });
          });
      });

      it('it should not update the product without authentication', done => {
          var product = new Product({
              name: 'Motorola G4 Plus',
              description: 'Motorola phone',
              productCode: 110022,
              price: 10000,
              qtyInStock: 12
          });

          product.save(() => {
              var _product = {
                  name: 'Motorola G4 S Plus'
              }
              chai.request(server)
                  .post('/api/products/' + product._id)
                  .send(_product)
                  .end((err, res) => {
                      res.should.have.status(401);
                      res.body.should.have.property('hasError');
                      res.body.hasError.should.be.eql(1);
                      res.body.should.have.property('errorGroup');
                      res.body.errorGroup.should.be.eql('UnauthorizedError');
                      done();
                  });
          });
      });

      it('it should not update the product if not found in database', done => {
          var product = new Product({
              name: 'Motorola G4 Plus',
              description: 'Motorola phone',
              productCode: 110022,
              price: 10000,
              qtyInStock: 12
          });

          product.save(() => {
              var _product = {
                  name: 'Motorola G4 S Plus'
              }
              var id = new mongoose.Types.ObjectId();
              chai.request(server)
                  .post('/api/products/' + id + '?access_token=' + user.token)
                  .send(_product)
                  .end((err, res) => {
                      res.should.have.status(404);
                      res.body.should.have.property('hasError');
                      res.body.hasError.should.be.eql(1);
                      res.body.should.have.property('errorGroup');
                      res.body.errorGroup.should.be.eql('ProductNotFoundError');
                      done();
                  });
          });
      });   
  });

  describe('GET/search', () => {
      it('it should search all products that have product code or name matching with query', done => {
          var p1 = new Product({
              name: "Moto G",
              productCode: 'moto1',
              price: 10000,
              qtyInStock: 10
          });

          var p2 = new Product({
              name: "Moto G2",
              productCode: 'moto2',
              price: 100,
              qtyInStock: 10
          });

          var p3 = new Product({
              name: "iPhone 5",
              productCode: 'moto3',
              price: 100,
              qtyInStock: 10
          });

          var p4 = new Product({
              name: "iPhone6",
              productCode: 'i6',
              price: 100,
              qtyInStock: 10
          });

          Product.create([p1,p2,p3,p4], (err) => {
              chai.request(server)
                  .get('/api/products/search?q=moto&access_token=' + user.token)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('array');
                      res.body.length.should.be.eql(3);
                      done();
                  });
          });   
      });

      it('it should not search products without authentication', done => {
          var p1 = new Product({
              name: "Moto G",
              productCode: 'moto1',
              price: 10000,
              qtyInStock: 10
          });

          var p2 = new Product({
              name: "Moto G2",
              productCode: 'moto2',
              price: 100,
              qtyInStock: 10
          });

          var p3 = new Product({
              name: "iPhone 5",
              productCode: 'moto3',
              price: 100,
              qtyInStock: 10
          });

          var p4 = new Product({
              name: "iPhone6",
              productCode: 'i6',
              price: 100,
              qtyInStock: 10
          });

          Product.create([p1,p2,p3,p4], () => {
              chai.request(server)
                  .get('/api/products/search?q=moto')
                  .end((err, res) => {
                      res.should.have.status(401);
                      res.body.should.have.property('hasError');
                      res.body.hasError.should.be.eql(1);
                      res.body.should.have.property('errorGroup');
                      res.body.errorGroup.should.be.eql('UnauthorizedError');
                      done();
                  });
          });   
      });
  });

  describe('DELETE/:id', () => {
      it('it should delete the requested product', done => {
          var product = new Product({
              name: "iPhone 5",
              productCode: 'moto3',
              price: 100,
              qtyInStock: 10
          });

          product.save(() => {
              chai.request(server)
                  .delete('/api/products/' + product._id + '?access_token=' + user.token)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property('message');
                      res.body.message.should.be.eql('success');
                      done();
                  });
          });
      });

      it('it should not delete the requested product without authentication', done => {
          var product = new Product({
              name: "iPhone 5",
              productCode: 'moto3',
              price: 100,
              qtyInStock: 10
          });

          product.save(() => {
              chai.request(server)
                  .delete('/api/products/' + product._id)
                  .end((err, res) => {
                      res.should.have.status(401);
                      res.body.should.have.property('hasError');
                      res.body.hasError.should.be.eql(1);
                      res.body.should.have.property('errorGroup');
                      res.body.errorGroup.should.be.eql('UnauthorizedError');
                      done();
                  });
          });
      });
  });
});