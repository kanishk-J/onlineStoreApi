Online Store APIs
____________________

API Design Doc available [here](https://enigmatic-retreat-31467.herokuapp.com/).

## Usage

To install the APIs on your local computer, clone the repository in your workspace. Install all the dependencies using:-

```js
npm install
```

Once finished with the setup, you are now ready to start.
To execute test, use the following command:-

```js
npm test
```

To start the server and start using the APIs, use following command:-

```js
npm start
```

Once the server starts, visit localhost:4000 in your browser. You will be able to see API docs. A John Doe default admin user has already been added with following credentials:-
email: johndoe@abc.com
password: johndoe

If you wish to use local mongodb instance, make sure you set the seed property in config to true while running the code first time.

## API list

### User API

| Name       | Method     | Description |
|------------|----------|-------------|
|`CreateUser`  | POST   | This `POST` api is used for registering a new user in the app. |
|`CreateAdmin`  | POST   | This `POST` api is used for creating a new admin user in the app. Only another admin user can use this api |
|`DeleteUser`      | DELETE   | This `DELETE` api is used to remove a user from database. Only admin user can use this api |
|`FetchProfile`     | GET   | This `GET` api is used to retreive user profile data based on authentication token |
|`FindUser`  | GET  | This `GET` api is used to find a user in databse provided its id. Only admin user can use this api |
|`ShowUsers`     | GET  | This `GET` api finds all the available users database. Only admin user can use this |

### Product API

| Name       | Method     | Description |
|------------|----------|-------------|
|`AddProduct`  | POST   | This `POST` api is used for adding a new product to store |
|`DeleteProduct`  | DELETE   | This `DELETE` api is used for deleting an existing product from the store |
|`FindProductById`      | GET   | This `GET` api is used to find a product provided the id of the product |
|`FindProductByName`     | GET   | This `GET` api is used to find a product provided the full name of the product |
|`SearchProducts`  | GET  | This `GET` api is a search utility that matches the search param with product name or its alphanumeric product code |
|`ShowProducts`     | GET  | This `GET` api finds all the available products in the store |
|`UpdateProduct`  | POST  | This `POST` api is used to update an existing product. |

### Authentication

| Name       | Method     | Description |
|------------|----------|-------------|
|`authentication`  | POST   | This `POST` api is used to login user in the system and retrieve a new access token for him/her. |