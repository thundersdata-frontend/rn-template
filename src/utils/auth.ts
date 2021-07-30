import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeEmpty } from './object';

const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';

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
  const result = await AsyncStorage.getItem(USER_INFO);
  return !!result;
};

/**
 * 持久化token相关数据
 * @param token
 */
export const saveToken = (token: Token) => {
  const { accessToken, refreshToken, tokenExpireTime, tokenExpiresIn } = token;
  const _token = removeEmpty({ accessToken, refreshToken, tokenExpireTime, tokenExpiresIn });
  AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(_token));
};

export const getToken: () => Promise<Token> = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return {};
};
