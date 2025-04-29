// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Seção para ignorar arquivos e diretórios
  {
    ignores: [
      'node_modules/**', // Ignora o diretório node_modules e seu conteúdo
      '!node_modules/mylibrary/**', // Desfaz a ignorância para node_modules/mylibrary
      '.vscode/**', // Ignora o diretório .vscode
      '.prettierrc.js', // Ignora o arquivo .prettierrc.js
    ],
  },
  // Configurações principais do ESLint
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['import'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Bibliotecas principais (React, Next.js) e outros módulos externos
            'internal', // Módulos internos (@shared, @modules, @components)
            ['parent', 'sibling', 'index'], // Imports relativos
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,next,next/**,@next/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@mui/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@modules/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'absolute/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
