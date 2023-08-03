module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/default': 'off',
    'import/no-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern:
              '{vue,vue-router,vuex,@/store,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**}',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '{vuetify,vuetify/**}',
            group: 'parent',
            position: 'before'
          },
          {
            pattern: '{@/**}',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue']
    },
    'import/resolver': {
      typescript: true,
      alias: {
        map: [
          ['@', './src'],
          ['~', './node_modules']
        ],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
      }
    }
  }
}
