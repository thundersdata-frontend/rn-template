import Config from 'react-native-config';

import axios from 'axios';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';

import { getMMKVItem, setMMKVItem } from './atoms';

const codeMessage: Record<number, string> = {
  400: '用户没有权限（令牌错误）',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const initRequest = () => {
  const instance = axios.create({
    timeout: 30000,
    withCredentials: false,
    responseType: 'json',
    validateStatus: () => {
      return true;
    },
  });

  // 配置请求拦截器
  instance.interceptors.request.use(async config => {
    const token = getMMKVItem<Token>('token');
    if (isEmpty(token)) return config;

    const { accessToken, refreshToken, tokenExpireTime } = token;

    // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
    if (dayjs().isAfter(dayjs(tokenExpireTime))) {
      const result = await fetch(`${Config['basic']}/auth/token/refresh?refreshToken=${refreshToken}`, {
        headers: {},
      }).then(response => response.json());

      const { data } = result;
      setMMKVItem<Token>('token', data);
      // 对request的header增加accessToken配置
      config['headers'].set('accessToken', data.accessToken! as string);
    } else {
      // 对request的header增加accessToken配置
      config['headers'].set('accessToken', accessToken! as string);
    }
    return config;
  });

  instance.interceptors.response.use(
    // 成功响应处理
    response => {
      const { status } = response;
      if (status === 200) {
        return Promise.resolve(response);
      } else {
        const errorText = codeMessage[status] || response.statusText || '请求错误';
        return Promise.reject(new Error(JSON.stringify({ message: errorText })));
      }
    },
    // 错误响应处理
    error => {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // 请求超时错误处理
        return Promise.reject(new Error(JSON.stringify({ message: '请求超时，请重试' })));
      } else {
        // 其他错误处理
        return Promise.reject(new Error(JSON.stringify({ message: '请求出错，请重试' })));
      }
    }
  );

  return instance;
};
