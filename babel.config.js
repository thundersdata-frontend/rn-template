module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
      },
    ],
    [
      'import',
      {
        libraryName: '@td-design/react-native',
        libraryDirectory: 'lib/module',
      },
      'rn',
    ],
    [
      'import',
      {
        libraryName: '@td-design/rn-hooks',
        libraryDirectory: 'lib/module',
        camel2DashComponentName: false, // default: true
      },
      'hooks',
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
