/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-10 02:52:21
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-15 18:25:52
 */
import AsyncStorage from '@react-native-community/async-storage';
import { UserInfoInter, initialUserInfoData } from '../interfaces/user';

const TOKEN_KEY = 'token';
const PRIVILEGE = 'privilege';
const SELECTED_MODULE = 'selectedModule';
const LANGUAGE = 'language';
const USER_INFO = 'userInfo';
const ROLE_ID = 'roleId';

export const saveToken = (token: string) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveRoleId = (roleId: string) => {
  AsyncStorage.setItem(ROLE_ID, roleId);
};

export const saveUserInfo = (info: Omit<UserInfoInter, 'token' | 'userInfo'>) => {
  AsyncStorage.setItem(USER_INFO, JSON.stringify(info));
};

export const savePrivileges = (privileges: string[] = []) => {
  AsyncStorage.setItem(PRIVILEGE, JSON.stringify(privileges));
};

export const saveLanguage = (lang: string) => {
  AsyncStorage.setItem(LANGUAGE, lang);
};

/**
 * @功能描述: 退出登录
 * @参数:
 * @返回值:
 */
export const signOut = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(SELECTED_MODULE),
      AsyncStorage.removeItem(USER_INFO)
    ])
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

export const getUserInfo: () => Promise<Omit<UserInfoInter, 'token' | 'userInfo'>> = async () => {
  const result = await AsyncStorage.getItem(USER_INFO);
  if (result) {
    return JSON.parse(result);
  }
  return initialUserInfoData;
};

export const getPrivileges = async (): Promise<string[]> => {
  const result = await AsyncStorage.getItem(PRIVILEGE);
  if (result) {
    return JSON.parse(result);
  }
  return [];
};

export const getToken = async () => {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return result || '';
};
