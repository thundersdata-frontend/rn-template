module.exports = {
  testEnvironment: 'node',
  preset: 'react-native',
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {},
  },
  cacheDirectory: '.jest/cache',
};
