import { NativeModules } from 'react-native';

export const ExitApp = {
  exit: function () {
    NativeModules.RNExitApp.exitApp();
  },
};
