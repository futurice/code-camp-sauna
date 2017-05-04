module.exports = {
    "extends": "google",
    "parserOptions": {
      "ecmaVersion": 6
    },
    "rules": {
      "require-jsdoc": ["error", {
          "require": {
              "FunctionDeclaration": false,
              "MethodDefinition": false,
              "ClassDeclaration": false,
              "ArrowFunctionExpression": false
          }
      }]
    }
};
