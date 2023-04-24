import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

interface ShortcutItem {
  type: string;
  title: string;
  icon?: string;
}

interface AppShortcut {
  getInitialShortcut(): Promise<ShortcutItem>;
  setShortcuts(items: ShortcutItem[]): void;
  clearShortcuts(): void;
  addListener(callback: (shortcut: ShortcutItem) => void): void;
  removeListener(): void;
}

const ShortcutsEmitter = new NativeEventEmitter(NativeModules.ShortcutModule);
const AppShortcut = NativeModules.ShortcutModule;
let _initialAction = AppShortcut && AppShortcut.initialAction;

export default {
  getInitialShortcut() {
    if (Platform.OS === 'android') {
      return AppShortcut.getInitialShortcut();
    }
    return new Promise(resolve => {
      const initialAction = _initialAction;
      _initialAction = null;
      resolve(initialAction);
    });
  },
  setShortcuts(items: ShortcutItem[]) {
    AppShortcut.setShortcuts(items);
  },
  clearShortcuts() {
    AppShortcut.clearShortcuts();
  },
  addListener: (callback: (shortcut: ShortcutItem) => void) => {
    ShortcutsEmitter.addListener('onShortcutItemPressed', callback);
  },
  removeListener: () => {
    ShortcutsEmitter.removeAllListeners('onShortcutItemPressed');
  },
} as AppShortcut;
