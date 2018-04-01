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
    },
    "env": {
        "browser": true,
        "node": true
    }
};