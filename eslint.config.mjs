import eslintJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    name: 'project/ignores',
    ignores: ['.next/', 'node_modules/', 'dist/', 'public/', 'next-env.d.ts'],
  },
  {
    name: 'project/base',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ...eslintJs.configs.recommended,
  },
  {
    name: 'project/typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    name: 'project/react',
    files: ['**/*.{tsx,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'project/next',
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    name: 'project/tanstack-query',
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@tanstack/query': tanstackQueryPlugin,
    },
    rules: {
      ...tanstackQueryPlugin.configs.recommended.rules,
    },
  },
  {
    name: 'project/jest',
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
  {
    name: 'project/custom-rules',
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-console': 'warn',
      'max-depth': ['error', 3],
    },
  },
  {
    name: 'project/prettier',
    ...prettierConfig,
  },
]);
