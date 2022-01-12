import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeEmpty } from './object';

const TOKEN_KEY = 'token';

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
