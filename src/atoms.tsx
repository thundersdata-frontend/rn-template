import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, PrimitiveAtom } from 'jotai';
import { removeEmpty } from 'utils/object';

/** 是否登录 */
export const authAtom = atom({
  signedIn: false,
});

/** 绑定atom和AsyncStorage */
export function atomWithAsyncStorage<T>(key: string, initialValue: T): PrimitiveAtom<T> {
  const getInitialValue: () => Promise<T> = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        const type = typeof initialValue;
        switch (type) {
          case 'object':
            return Promise.resolve(JSON.parse(value));
          case 'boolean':
            return Promise.resolve(value === 'true' ? true : false);
          case 'number':
            return Promise.resolve(+value);
          case 'string':
          default:
            return Promise.resolve(value);
        }
      }
      return Promise.resolve(initialValue);
    } catch (error) {
      return Promise.resolve(initialValue);
    }
  };

  const baseAtom = atom(initialValue);
  baseAtom.onMount = setAtom => {
    getInitialValue().then(setAtom);
  };

  return atom(
    get => get(baseAtom),
    (get, set, update) => {
      const newValue = typeof update === 'function' ? (update as (prev: T) => T)(get(baseAtom)) : update;
      set(baseAtom, newValue);

      const type = typeof newValue;
      switch (type) {
        case 'object':
          AsyncStorage.setItem(key, JSON.stringify(removeEmpty(newValue)));
          break;
        case 'number':
        case 'boolean':
          AsyncStorage.setItem(key, newValue + '');
          break;
        case 'string':
        default:
          AsyncStorage.setItem(key, newValue as unknown as string);
          break;
      }
    },
  );
}

/** 用户信息 */
export const userInfoAtom = atomWithAsyncStorage<UserInfo>('userInfo', {});

/** Token信息 */
export const tokenAtom = atomWithAsyncStorage<Token>('token', {});
