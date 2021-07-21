import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertNullToEmptyString } from './string';

const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';

export const saveToken = (token: string) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveUserInfo = (info: UserInfo) => {
  const userInfo = convertNullToEmptyString(info);
  AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};

/**
 * @功能描述: 退出登录
 * @参数:
 * @返回值:
 */
export const signOut = () => {
  return new Promise((resolve, reject) => {
    Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_INFO)])
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};

/**
 * @功能描述: 判断是否已登录
 * @参数:
 * @返回值:
 */
export const isSignedIn = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return !!result;
};

export const getUserInfo: () => Promise<UserInfo> = async () => {
  const result = await AsyncStorage.getItem(USER_INFO);
  if (result) {
    return JSON.parse(result);
  }
  return {};
};

export const getToken = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return result || '';
};
