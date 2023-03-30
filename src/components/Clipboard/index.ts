import { NativeModules } from 'react-native';

export const Clipboard = {
  copy: function (text: string) {
    NativeModules.ClipboardModule.copy(text);
  },
  paste: async function () {
    const data = await NativeModules.ClipboardModule.paste();
    return data;
  },
};
