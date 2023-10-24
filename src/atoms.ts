import { MMKV } from 'react-native-mmkv';

import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const storage = new MMKV();

export function getValueInStorage<Value>(key: string, initialValue: Value) {
  const type = typeof initialValue;
  switch (type) {
    case 'object':
      const value = storage.getString(key);
      if (!value) return initialValue;
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(error);
        return initialValue;
      }

    case 'string':
      return storage.getString(key) || initialValue;

    case 'number':
      return storage.getNumber(key) || initialValue;

    case 'boolean':
      return storage.getBoolean(key) || initialValue;

    default:
      return storage.contains(key) ? storage.getString(key) : initialValue;
  }
}

function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

function removeItem(key: string) {
  storage.delete(key);
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
    }))
  );

// 用户信息Atom
export const userInfoAtom = atomWithMMKV<UserInfo>('userInfo', {});

// 是否确认过用户协议
export const confirmedAtom = atomWithMMKV<boolean>('confirmed', false);

// 是否登录
export const signedInAtom = atomWithMMKV<boolean>('signedIn', false);

// 登录token
export const tokenAtom = atomWithMMKV<Token>('token', {});
