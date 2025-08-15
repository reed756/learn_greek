// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      // @ts-ignore
      ...tseslint.configs.recommended,
      // @ts-ignore
      ...tseslint.configs.stylistic,
      // @ts-ignore
      ...angular.configs.tsRecommended,
      // @ts-ignore
      prettierConfig,
    ],
    plugins: { prettier: prettierPlugin },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      'prettier/prettier': 'error', // Enforce Prettier formatting as lint errors
      '@typescript-eslint/no-explicit-any': 'error', // Forbid usage of 'any'
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
