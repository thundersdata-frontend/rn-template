module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    camelcase: 'error',
    'spaced-comment': 'error',
    quotes: ['error', 'single'],
    'no-duplicate-imports': 'error',
    'no-case-declarations': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='View']",
        message: 'Use Box from @td-design/react-native instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='Text']",
        message: 'Use Text from @td-design/react-native instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='Button']",
        message: 'Use Button from @td-design/react-native instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='Image']",
        message: 'Use Image from expo-image instead',
      },
      {
        selector: "ImportDeclaration[source.value='react'] > ImportSpecifier[imported.name='useState']",
        message: 'Use useSafeState from @td-design/rn-hooks instead',
      },
      {
        selector: "ImportDeclaration[source.value='react'] > ImportSpecifier[imported.name='useCallback']",
        message: 'Use useMemoizedFn from @td-design/rn-hooks instead',
      },
    ],
  },
};
