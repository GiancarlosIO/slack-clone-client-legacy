const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-console": 0,
    "no-param-reassign": 0,
    "object-curly-newline": 0,
    "jsx-a11y/anchor-is-valid": 0,
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack/development.js",
        "extensions": [".js", ".jsx", ".es", ".es6", ".mjs", ".graphql", ".gql"],
      }
    }
  }
}