const OFF = 0, WARN = 1, ERROR = 2;
module.exports = {
  "extends": ["airbnb", "prettier"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false,
    "ecmaFeatures": {
      globalReturn: true,
      impliedStrict: true,
      jsx: true,
      arrowFunction: true
    }
  },
  "plugins": [
    "react",
    "prettier",
  ],
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
  },
  "rules": {
    // TOOLS RULES
    "prettier/prettier": "error",
    // REACT RULES
    "react/destructuring-assignment": OFF,
    "jsx-a11y/no-noninteractive-element-interactions": OFF,
    "react/jsx-filename-extension": [WARN, {"extensions": [".js", ".jsx"]}],
    "react/jsx-indent": [OFF],
    "react/forbid-prop-types": OFF,
    "react/jsx-one-expression-per-line": OFF,
    // JS RULES
    "import/prefer-default-export": OFF,
    "no-console": OFF,
    "no-underscore-dangle": OFF,
    "jsx-a11y/no-static-element-interactions": OFF,
    "jsx-a11y/click-events-have-key-events": OFF,
    "jsx-a11y/alt-text": OFF,

    // TEMP RULES
    "no-use-before-define": OFF,
    "prefer-destructuring": OFF,
    "global-require": OFF,
    "import/no-unresolved": OFF,
    "react/prop-types": OFF,
    "import/no-extraneous-dependencies": OFF
  }
};