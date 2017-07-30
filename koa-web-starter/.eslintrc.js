module.exports = {
  "extends": "airbnb",

  "env": {
    "mocha": true,
    "node": true,
  },

  "rules": {
    "no-console": 2,
    "no-underscore-dangle": 0,
    "import/no-unresolved": 0,
    "func-names": 0,
  },

  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules",
        ],
      },
    },
  },
};
