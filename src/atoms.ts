import { MMKV } from 'react-native-mmkv';

import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const storage = new MMKV();

export function getMMKVItem<T>(key: string): T {
  return storage.getString(key) as unknown as T;
}

export function setMMKVItem<T>(key: string, value: T) {
  storage.set(key, value as unknown as string);
}

export function removeMMKVItem(key: string) {
  storage.delete(key);
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem: getMMKVItem, // createJSONStorage 会自动调用 JSON.parse
      setItem: setMMKVItem, // createJSONStorage 会自动调用 JSON.stringify
      removeItem: removeMMKVItem,
    })),
    { getOnInit: true }
  );

// 用户信息Atom
export const userInfoAtom = atomWithMMKV<UserInfo>('userInfo', {});

// 是否确认过用户协议
export const confirmedAtom = atomWithMMKV<boolean>('confirmed', false);

// 是否登录
export const signedInAtom = atomWithMMKV<boolean>('signedIn', false);

// 登录token
export const tokenAtom = atomWithMMKV<Token>('token', {});

/** 当前登录用户拥有的权限列表 */
export const permissionAtom = atomWithMMKV<string[]>('permissions', []);
