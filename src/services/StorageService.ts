import { removeEmpty } from 'utils/object';
import { MMKV } from 'react-native-mmkv';

export enum StorageToken {
  SignedIn = 'SignedIn',
  Token = 'Token',
  UserInfo = 'UserInfo',
  Confirmed = 'Confirmed',
}

class StorageService {
  private static instance: StorageService;

  storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }

    return StorageService.instance;
  }

  get confirmed(): boolean {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.Confirmed)) {
      return StorageService.getInstance().storage.getBoolean(StorageToken.Confirmed);
    }
    return false;
  }

  get signedIn(): boolean {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.SignedIn)) {
      return StorageService.getInstance().storage.getBoolean(StorageToken.SignedIn);
    }
    return false;
  }

  get token(): Token {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.Token)) {
      const tokenStr = StorageService.getInstance().storage.getString(StorageToken.Token);
      try {
        return tokenStr ? JSON.parse(tokenStr) : {};
      } catch (error) {
        console.error(error);
        return {};
      }
    }
    return {};
  }

  get userInfo(): UserInfo {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.UserInfo)) {
      const userInfoStr = StorageService.getInstance().storage.getString(StorageToken.UserInfo);
      try {
        return userInfoStr ? JSON.parse(userInfoStr) : {};
      } catch (error) {
        console.error(error);
        return {};
      }
    }
    return {};
  }

  updateStorage<T>(key: StorageToken, value: T) {
    try {
      const type = typeof value;

      switch (type) {
        case 'object':
          const oldValue = StorageService.getInstance().storage.getString(key);
          if (oldValue) {
            const oldObj = JSON.parse(oldValue);
            StorageService.getInstance().storage.set(key, removeEmpty({ ...oldObj, ...value }));
          } else {
            StorageService.getInstance().storage.set(key, JSON.stringify(removeEmpty(value)));
          }
          break;

        case 'string':
        case 'number':
        case 'boolean':
          StorageService.getInstance().storage.set(key, value as unknown as string | number | boolean);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  deleteStorage(key: StorageToken) {
    StorageService.getInstance().storage.delete(key);
  }

  signOut() {
    StorageService.getInstance().deleteStorage(StorageToken.SignedIn);
    StorageService.getInstance().deleteStorage(StorageToken.UserInfo);
    StorageService.getInstance().deleteStorage(StorageToken.Token);
  }
}

export const storageService = StorageService.getInstance();
