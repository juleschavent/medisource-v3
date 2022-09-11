module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
  ],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'react/prop-types': 0,
    'quotes': [
      'error',
      'single'
    ],
    // We want to force semicolons
    'semi': [
      'error',
      'always'
    ],
    // We use 2 spaces to indent our code
    'indent': [
      'error',
      2
    ],
    // We want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    'react/jsx-one-expression-per-line': ['error', {
      'allow': 'single-child'
    }],
    'operator-linebreak': 'off',
    // 'object-curly-newline': [
    //   'error',
    //   {
    //     'ObjectExpression': 'always',
    //     'ObjectPattern': {
    //       'multiline': true,
    //       'minProperties': 3
    //     },
    //     'ImportDeclaration': 'never',
    //     'ExportDeclaration': {
    //       'multiline': true,
    //       'minProperties': 3
    //     }
    //   }
    // ],
  }
};
