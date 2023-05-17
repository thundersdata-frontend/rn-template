import { MMKV } from 'react-native-mmkv';

import { atom, WritableAtom } from 'jotai';

type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);

export const RESET = Symbol();
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

export function atomWithStorage<Value = undefined>(
  key: string,
  initialValue: Value
): WritableAtom<Value, [SetStateActionWithReset<Value>], void> {
  const baseAtom = atom(initialValue);

  baseAtom.onMount = setAtom => {
    const value = getValueInStorage<Value>(key, initialValue);
    setAtom(value);
  };

  return atom(
    get => get(baseAtom),
    (get, set, update: SetStateActionWithReset<Value>) => {
      const nextValue =
        typeof update === 'function' ? (update as (prev: Value) => Value | typeof RESET)(get(baseAtom)) : update;
      if (nextValue === RESET) {
        set(baseAtom, initialValue);
        storage.delete(key);
      } else {
        const type = typeof nextValue;
        switch (type) {
          case 'object':
            const newValue = { ...get(baseAtom), ...nextValue };
            set(baseAtom, newValue);
            storage.set(key, JSON.stringify(newValue));
            break;

          case 'boolean':
            set(baseAtom, nextValue);
            storage.set(key, nextValue as boolean);
            break;

          case 'number':
            set(baseAtom, nextValue);
            storage.set(key, nextValue as number);
            break;

          case 'string':
            set(baseAtom, nextValue);
            storage.set(key, nextValue as string);
            break;

          case 'undefined':
            set(baseAtom, nextValue);
            storage.delete(key);
            break;

          default:
            break;
        }
      }
    }
  );
}

// 用户信息Atom
export const userInfoAtom = atomWithStorage<UserInfo>('userInfo', {});

// 是否确认过用户协议
export const confirmedAtom = atomWithStorage<boolean>('confirmed', false);

// 是否登录
export const signedInAtom = atomWithStorage<boolean>('signedIn', false);

// 登录token
export const tokenAtom = atomWithStorage<Token>('token', {});
