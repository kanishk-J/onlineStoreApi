define({ "api": [
  {
    "type": "post",
    "url": "/authentication",
    "title": "Authentication",
    "version": "0.0.1",
    "name": "Authentication",
    "description": "<p>This api takes email and password as input and retrieves a new access token for user. This access token will further be used to interact with different APIs.</p>",
    "group": "Authentication",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X POST http://localhost:4000/authentication",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Sample:",
          "content": "{\n    \"email\": \"kanishkjain071993@gmail.com\",\n    \"password\": \"kanishk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o\"\n}",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/authentication/authentication.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/products/",
    "title": "AddProduct",
    "description": "<p>Create a new product (User must be authenticated and have admin privileges)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product [optional]</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "productCode",
            "description": "<p>product code</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>product images [optional]</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Product selling price</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "qtyInStock",
            "description": "<p>Product in stock quantity</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Sample:",
          "content": "{\n    \"name\" : \"Motorola Moto G.5 plus\",\n    \"description\": \"Mmotorola mobile phone\",\n    \"images\": [],\n    \"productCode\": 1101,\n    \"price\": 15000,\n    \"qtyInStock\": 15\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "name": "Add_admin_user",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X POST http://localhost:4000/api/products/",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"59fc8d8d1db0304174ef63b9\", \n   \"name\" : \"Motorola Moto G.5 plus\",\n   \"description\": \"Mmotorola mobile phone\",\n   \"images\": [],\n   \"productCode\": 1101,\n   \"price\": 15000,\n   \"qtyInStock\": 15\n}",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          },
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Validation errors in user profile.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ValidationError\",\n    \"errorName\": \"ValidationError\",\n    \"validations\": [\n       \"email\": \"email is required\",\n       \"name\": \"name is required\"\n    ],\n    \"message\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "delete",
    "url": "/api/products/:id",
    "title": "DeleteProduct",
    "version": "0.0.1",
    "name": "Delete_Product",
    "group": "Product",
    "description": "<p>User must be authenticated with admin privileges</p>",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X Delete http://localhost:4000/api/products/59fc9d144116f409f4e4ef42",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Url Param": [
          {
            "group": "Url Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>String id of product to be deleted</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>product does not exists in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ProductNotFoundError\",\n    \"errorName\": \"ProductNotFoundError\",\n    \"message\": \"product not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/findById/:id",
    "title": "FindProductById",
    "version": "0.0.1",
    "name": "Find_Product_By_Id",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X GET http://localhost:4000/api/products/findById/59fc9d144116f409f4e4ef42",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Url Param": [
          {
            "group": "Url Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>string id of product</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>product's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "productCode",
            "description": "<p>product's code</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>products's images</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>product's price</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qtyInStock",
            "description": "<p>product's available quantity in stock</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n   \"name\": \"Motorola Moto G5 plus\",\n   \"description\": \"Motorola mobile phone\",\n   \"productCode\": \"1101\",\n   \"images\": [],\n   \"price\": \"15000\"\n   \"qtyInStock\": \"15\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>Product does not exists in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ProductNotFoundError\",\n    \"errorName\": \"ProductNotFoundError\",\n    \"message\": \"product does not exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/findByName/:name",
    "title": "FindProductByName",
    "version": "0.0.1",
    "name": "Find_Product_By_Name",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X GET http://localhost:4000/api/products/findByName/Motorola Moto G5 plus",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Url Param": [
          {
            "group": "Url Param",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of product</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>product's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "productCode",
            "description": "<p>product's code</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "images",
            "description": "<p>products's images</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>product's price</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "qtyInStock",
            "description": "<p>product's available quantity in stock</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{  \n   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n   \"name\": \"Motorola Moto G5 plus\",\n   \"description\": \"Motorola mobile phone\",\n   \"productCode\": \"1101\",\n   \"images\": [],\n   \"price\": \"15000\"\n   \"qtyInStock\": \"15\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>Product does not exists in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ProductNotFoundError\",\n    \"errorName\": \"ProductNotFoundError\",\n    \"message\": \"product does not exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/",
    "title": "ShowProducts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "description": "<p>User must be authenticated</p>",
    "version": "0.0.1",
    "name": "GetProducts",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -i http://localhost:4000/api/products/",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     hasError: 0,\n     products: [\n               {\n                   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n                   \"name\": \"Motorola Moto G5 plus\",\n                   \"description\": \"Motorola mobile phone\",\n                   \"productCode\": \"1101\",\n                   \"images\": [],\n                   \"price\": \"15000\",\n                   \"qtyInStock\": \"15\"\n               },\n               {\n                   \"_id\": \"59fc8d8d1db0304174ef63b0\",\n                   \"name\": \"Apple iPhone X\",\n                   \"description\": \"Apple's new i phone\",\n                   \"productCode\": \"1116\",\n                   \"images\": [],\n                   \"price\": 82999,\n                   \"qtyInStock\": 20\n               }\n       ]\n }",
          "type": "Object[]"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>Product not found.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/search",
    "title": "SearchProducts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "string",
            "optional": false,
            "field": "q",
            "description": "<p>product name or product code</p>"
          }
        ]
      }
    },
    "description": "<p>Search product via name or product code.</p>",
    "version": "0.0.1",
    "name": "Search_Products_via_name_of_product_code",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -i http://localhost:4000/api/products/search?q=moto",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "products",
            "description": "<p>List of products</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     hasError: 0,\n     products: [\n               {\n                   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n                   \"name\": \"Motorola Moto G5 plus\",\n                   \"description\": \"Motorola mobile phone\",\n                   \"productCode\": \"1101\",\n                   \"images\": [],\n                   \"price\": \"15000\",\n                   \"qtyInStock\": \"15\"\n               }\n       ]\n }",
          "type": "Object[]"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>Product not found.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/products/:id",
    "title": "UpdateProduct",
    "description": "<p>update a product (User must be authenticated and have admin privileges)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of product</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "productCode",
            "description": "<p>product code</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>product images</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Product selling price</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "qtyInStock",
            "description": "<p>Product in stock quantity</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Sample:",
          "content": "{\n    \"_id\": \"59fc8d8d1db0304174ef63b9\",\n    \"name\" : \"Motorola Moto G.5 plus\",\n    \"description\": \"Mmotorola mobile phone\",\n    \"images\": [],\n    \"productCode\": 1101,\n    \"price\": 13999,\n    \"qtyInStock\": 12\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "name": "UpdateProduct",
    "group": "Product",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X POST http://localhost:4000/api/products/59fc8d8d1db0304174ef63b9",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"59fc8d8d1db0304174ef63b9\", \n   \"name\" : \"Motorola Moto G.5 plus\",\n   \"description\": \"Mmotorola mobile phone\",\n   \"images\": [],\n   \"productCode\": 1101,\n   \"price\": 13999,\n   \"qtyInStock\": 12\n}",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          },
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Validation errors in user profile.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "ProductNotFoundError",
            "description": "<p>product does not exists in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ValidationError\",\n    \"errorName\": \"ValidationError\",\n    \"validations\": [\n       \"email\": \"email is required\",\n       \"name\": \"name is required\"\n    ],\n    \"message\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ProductNotFoundError\",\n    \"errorName\": \"ProductNotFoundError\",\n    \"message\": \"product not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/product/product.controller.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/users/addAdminUser",
    "title": "CreateAdmin",
    "description": "<p>Create a new admin user (User must be authenticated and have admin privileges)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>User's status [optional]</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "DOB",
            "description": "<p>User's date of birth [optional]</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Sample:",
          "content": "{\n    \"name\" : \"Kanishk Jain\",\n    \"email\": \"kanishkjain071993@gmail.com\",\n    \"password\": \"kanishk\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "name": "Add_admin_user",
    "group": "User",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X POST http://localhost:4000/api/users/addAdminUser",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o\"\n}",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          },
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Validation errors in user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ValidationError\",\n    \"errorName\": \"ValidationError\",\n    \"validations\": [\n       \"email\": \"email is required\",\n       \"name\": \"name is required\"\n    ],\n    \"message\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/",
    "title": "CreateUser",
    "version": "0.0.1",
    "name": "CreateUser",
    "group": "User",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X POST http://localhost:4000/api/users/",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>User's status [optional]</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "DOB",
            "description": "<p>User's date of birth [optional]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Sample:",
          "content": "{\n    \"name\" : \"Kanishk Jain\",\n    \"email\": \"kanishkjain071993@gmail.com\",\n    \"password\": \"kanishk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>User's newly created access token for aithentication.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o\"\n}",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          },
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Validation errors in user profile.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"ValidationError\",\n    \"errorName\": \"ValidationError\",\n    \"validations\": [\n       \"email\": \"email is required\",\n       \"name\": \"name is required\"\n    ],\n    \"message\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "DeleteUser",
    "version": "0.0.1",
    "name": "Delete_User_profile",
    "group": "User",
    "description": "<p>User must be authenticated with admin privileges</p>",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X Delete http://localhost:4000/api/users/59fc9d144116f409f4e4ef42",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Url Param": [
          {
            "group": "Url Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>String id of user to be deleted</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "UserNotFoundError",
            "description": "<p>User does not exists in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UserNotFoundError\",\n    \"errorName\": \"UserNotFoundError\",\n    \"message\": \"user not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "FindUser",
    "version": "0.0.1",
    "name": "Find_User",
    "group": "User",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X GET http://localhost:4000/api/users/59fc9d144116f409f4e4ef42",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Url Param": [
          {
            "group": "Url Param",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>string id of user</p>"
          }
        ],
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>user's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user's status, if any</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DOB",
            "description": "<p>user's date of birth</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>user's role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n   \"name\": \"Kanishk Jain\",\n   \"email\": \"kanishkjain071993@gmail.com\",\n   \"DOB\": \"10/07/1993\",\n   \"status\": \"Innovating the world\",\n   \"role\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "UserNotFoundError",
            "description": "<p>User does not exists in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UserNotFoundError\",\n    \"errorName\": \"UserNotFoundError\",\n    \"message\": \"user does not exists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "ShowUsers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "description": "<p>User must be authenticated and have admin privileges</p>",
    "version": "0.0.1",
    "name": "GetUsers",
    "group": "User",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -i http://localhost:4000/api/users/",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     hasError: 0,\n     users: [\n               {\n                   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n                   \"name\": \"Kanishk Jain\",\n                   \"email\": \"kanishkjain071993@gmail.com\",\n                   \"status\": \"Innovating the world\",\n                   \"DOB\": \"10/07/1993\",\n                   \"role\": \"admin\",\n                   \"provider\": \"local\"\n               },\n               {\n                   \"_id\": \"59fc8d8d1db0304174ef63b0\",\n                   \"name\": \"Paranjay Gulati\",\n                   \"email\": \"paran.gulati@gmail.com\",\n                   \"status\": \"Living the digital revolution\",\n                   \"DOB\": \"09/15/1993\",\n                   \"role\": \"user\",\n                   \"provider\": \"local\"\n               }\n       ]\n }",
          "type": "Object[]"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "UserNotFoundError",
            "description": "<p>User not found.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Object",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>Unauthorized user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/me",
    "title": "FetchProfile",
    "version": "0.0.1",
    "name": "Get_User_profile",
    "group": "User",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "curl -X GET http://localhost:4000/api/users/me?access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZjYWQzZTE4MTI2MjIyYmNhODA5MjEiLCJpYXQiOjE1MDk3MzE2NDYsImV4cCI6MTUwOTgxODA0Nn0.TJSxLJ_hwVvs70Q00bmKtlEFwlaU6OdTZ9ClAK_h33o",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "String",
            "optional": false,
            "field": "access-token",
            "description": "<p>Authentication token of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>user's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user's status, if any</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DOB",
            "description": "<p>user's date of birth</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>user's role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"59fc8d8d1db0304174ef63b9\",\n   \"name\": \"Kanishk Jain\",\n   \"email\": \"kanishkjain071993@gmail.com\",\n   \"DOB\": \"10/07/1993\",\n   \"status\": \"Innovating the world\",\n   \"role\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "TechnicalError",
            "description": "<p>Technical errors if any.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "UserNotFoundError",
            "description": "<p>User does not exists in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UserNotFoundError\",\n    \"errorName\": \"UserNotFoundError\",\n    \"message\": \"user does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Server Error\n{\n    \"hasError\": 1,\n    \"errorGroup\": \"UnauthorizedError\",\n    \"errorName\": \"UnauthorizedError\",\n    \"message\": \"No authorization token was found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/api/user/user.controller.js",
    "groupTitle": "User"
  }
] });
