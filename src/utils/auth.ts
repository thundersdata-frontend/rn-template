/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-10 02:52:21
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-14 16:55:58
 */
import AsyncStorage from '@react-native-community/async-storage';
import { PersonInfo } from '../interfaces/person';
import { initialPersonInfo } from '../stores/user';

const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';
const PRIVILEGE = 'privilege';

export const saveToken = (token: string) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveUserInfo = (userInfo: PersonInfo) => {
  AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};

export const getUserInfo = async (): Promise<PersonInfo> => {
  const result = await AsyncStorage.getItem(USER_INFO);
  if (result) {
    return JSON.parse(result);
  }
  return initialPersonInfo;
};

export const savePrivileges = (privileges: string[] = []) => {
  AsyncStorage.setItem(PRIVILEGE, JSON.stringify(privileges));
};

export const getPrivileges = async (): Promise<string[]> => {
  const result = await AsyncStorage.getItem(PRIVILEGE);
  if (result) {
    return JSON.parse(result);
  }
  return [];
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
 * @功能描述: 拿到token
 * @参数:
 * @返回值:
 */
export const getToken = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return result || '';
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
