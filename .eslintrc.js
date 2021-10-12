module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "airbnb", "preact"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "object-curly-spacing": ["error", "always"],
    quotes: ["error", "double"],
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "max-len": ["error", { code: 120, tabWidth: 2 }],
    "comma-dangle": "off",
    "react/jsx-props-no-spreading": "off",
    "react/static-property-placement": "off",
    "react/no-unused-prop-types": "off",
    "react/forbid-foreign-prop-types": "off",
    "react-hooks/rules-of-hooks": "off",
  },
};
