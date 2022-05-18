module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "plugins": [
        "prettier",
        "import",
        "jest"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "no-param-reassign": "off",
        "camelcase": "off",
        "consistent-return": "off",
        "no-unused-vars": [
            "error",
            {
                "vars": "local",
                "args": "all",
                "ignoreRestSiblings": false
            }
        ]
    }
}
