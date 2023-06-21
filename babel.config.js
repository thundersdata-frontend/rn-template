module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
      },
    ],
    [
      'import',
      {
        libraryName: '@td-design/react-native',
        "customName": (name) => {
          if (name === 'use-theme') {
            return '@shopify/restyle/dist/hooks/useTheme';
          }
          return `@td-design/react-native/lib/module/${name}`;
        }
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
    [
      'react-native-reanimated/plugin', {
        relativeSourceLocation: true,
      },
    ]
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
