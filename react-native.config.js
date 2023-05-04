module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
  dependencies: {
    ...(process.env.NO_FLIPPER // or `process.env.NO_FLIPPER` for RN@0.71.x and above
      ? {
          'react-native-flipper': { platforms: { ios: null } },
        }
      : {}),
  },
};
