Online Store APIs
____________________

API Design Doc available [here](https://enigmatic-retreat-31467.herokuapp.com/).

## Usage

To start using the APIs directly, visit the above [link](https://enigmatic-retreat-31467.herokuapp.com/) add use the APIs directly.

To use the APIs locally, clone this repo in your workspace and follow the below steps:-

```js
npm install
```

```js
npm start
```

Once the server starts, visit localhost:4000 in your browser. You will be able to see API docs. A default admin user has already been added 

## API list

### Product API

| Name       | Method     | Description |
|------------|----------|-------------|
|`AddProduct`  | POST   |  |
|`animationType`  | string   | Defines what kind of animation will be used: `delayed`, `sync`, `oneByOne`, `script`, `scenario` or `scenario-sync`. [Default: `delayed`] |
|`fontSize`      | string   | Defines the size of the text you want to be rendered. |
|`fontColor`     | string   | Defines the color, you want the text to be rendered in. |
|`duration`  | integer  | Animation duration, in frames. [Default: `200`] |
|`delay`     | integer  | Time between the drawing of first and last path, in frames (only for `delayed` animations). |

