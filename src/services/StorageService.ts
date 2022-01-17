import { removeEmpty } from 'utils/object';
import { MMKV } from 'react-native-mmkv';

export enum StorageToken {
  SignedIn = 'SignedIn',
  Token = 'Token',
  UserInfo = 'UserInfo',
}

class StorageService {
  storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  get signedIn(): boolean {
    if (this.storage.getAllKeys().includes(StorageToken.SignedIn)) {
      return this.storage.getBoolean(StorageToken.SignedIn);
    }
    return true;
  }

  get token(): Token {
    if (this.storage.getAllKeys().includes(StorageToken.Token)) {
      const tokenStr = this.storage.getString(StorageToken.Token);
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
    if (this.storage.getAllKeys().includes(StorageToken.UserInfo)) {
      const userInfoStr = this.storage.getString(StorageToken.UserInfo);
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
          const oldValue = this.storage.getString(key);
          if (oldValue) {
            const oldObj = JSON.parse(oldValue);
            this.storage.set(key, removeEmpty({ ...oldObj, ...value }));
          } else {
            this.storage.set(key, JSON.stringify(removeEmpty(value)));
          }
          break;

        case 'string':
        case 'number':
        case 'boolean':
          this.storage.set(key, value as unknown as string | number | boolean);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  deleteStorage(key: StorageToken) {
    this.storage.delete(key);
  }

  signOut() {
    this.deleteStorage(StorageToken.SignedIn);
    this.deleteStorage(StorageToken.UserInfo);
    this.deleteStorage(StorageToken.Token);
  }
}

export const storageService = new StorageService();
