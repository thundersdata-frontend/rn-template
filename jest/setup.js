// import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
// jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// import 'react-native-gesture-handler/jestSetup';
// jest.mock('react-native-reanimated', () => {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const Reanimated = require('react-native-reanimated/mock');
//   Reanimated.default.call = () => {};
//   return Reanimated;
// });
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// jest.mock('rn-fetch-blob', () => {
//   return {
//     DocumentDir: () => {},
//     polyfill: () => {},
//   };
// });
jest.useFakeTimers();

// import { defs as authorizationDefs, authorization } from '../src/api/authorization';
// global.defs = {
//   authorization: authorizationDefs,
// };
// global.API = {
//   authorization,
// };
