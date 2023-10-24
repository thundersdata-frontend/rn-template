import { MMKV } from 'react-native-mmkv';

import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const storage = new MMKV();

export function getMMKVItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

export function setMMKVItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function removeMMKVItem(key: string) {
  storage.delete(key);
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem: getMMKVItem,
      setItem: setMMKVItem,
      removeItem: removeMMKVItem,
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
