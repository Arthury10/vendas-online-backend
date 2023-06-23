module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: ['plugin:@typescript-eslint/recommended'],

  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'unused-imports',
    'import'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-useless-constructor': ['off'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^@nestjs(/.*|$)'],
          ['^@generated(/.*|$)'],
          ['^@\\w'],
          ['^libs(/.*|$)'],
          ['^react(/.*|$)'],
          ['^\\.']
        ]
      }
    ],
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'sort-imports': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-explicit-any': ['off']
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  }
}
