import { NativeModules } from 'react-native';

export const Clipboard = {
  setString: function (text: string) {
    NativeModules.ClipboardModule.setString(text);
  },
  getString: async function () {
    const data = await NativeModules.ClipboardModule.getString();
    return data;
  },
  hasString: async function () {
    const data = await NativeModules.ClipboardModule.hasString();
    return data;
  },
  getImage: async function () {
    const data = await NativeModules.ClipboardModule.getImage();
    return data;
  },
};
