module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 1,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'space-before-function-paren': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0
  },
  globals: {
    'store': true
  }
}
