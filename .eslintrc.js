module.exports = { 
  root: true, 
  parser: '@typescript-eslint/parser', 
  parserOptions: { 
    project: ['./tsconfig.json'], 
    tsconfigRootDir: __dirname 
  }, 
  plugins: ['@typescript-eslint', 'eslint-plugin'], 
  env: { 
    es6: true, 
    node: true 
  }, 
  extends: [ 
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'prettier' 
  ], 
  rules: { 
    'semi': 'off', 
    '@typescript-eslint/semi': ['error'], 
    quotes: ['error', 'single', { allowTemplateLiterals: true }], 
  } 
}