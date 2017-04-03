module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: ["airbnb-base"],
  // required to lint *.vue files
  plugins: [
    'html',
    'flowtype',
    'flowtype-errors'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "flowtype-errors/show-errors": 2,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 1,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'space-before-function-paren': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'class-methods-use-this': 0,
    'no-bitwise': 0,
    'new-cap': 0,
    'quote-props': 0
  },
  globals: {
    'store': true,
    'window': true,
    toastr: true,
    moment: true
  },
}
