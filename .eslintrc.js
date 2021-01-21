  
module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-continue': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'no-shadow': 'off',
    'prefer-destructuring': 'off',
    camelcase: 'off',
  },
};