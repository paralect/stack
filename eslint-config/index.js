module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "mocha": true,
    "es6": true,
    "node": true,
  },
  "rules": {
    "no-console": 2,
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "no-unused-vars": ["error", { "args": "none" }],
    "react/prefer-stateless-function": 0,
    "linebreak-style": 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [ 'src/tests/**' ],
    }],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules",
          "resources"
        ]
      }
    }
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "globals": {
    "window": true,
  }
};
