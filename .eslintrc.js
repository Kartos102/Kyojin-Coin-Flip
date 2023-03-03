module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  
  extends: [
    "eslint:recommended", 
    "plugin:react/recommended", 
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: [
    "react",
  ],
  rules: {
    // enable additional rules
    "indent": ["warn", 2],
    "linebreak-style": ["warn", "windows"],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],

    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["warn", "always"],

    // disable rules from base configurations
    "for-direction": "off",
  },
};
