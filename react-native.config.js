module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
  dependencies: {
    "react-native-code-push": {
      platforms: {
        android: null
      }
    }
  }
};
