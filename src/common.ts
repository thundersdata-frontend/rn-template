import axios from 'axios';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import Config from 'react-native-config';
import { storageService, StorageToken } from 'services/StorageService';

export const initRequest = () => {
  const instance = axios.create({
    timeout: 30000,
    withCredentials: false,
    responseType: 'json',
  });

  // 配置请求拦截器
  instance.interceptors.request.use(async config => {
    const token = storageService.token;
    if (isEmpty(token)) return config;

    const { accessToken, refreshToken, tokenExpireTime } = token;

    // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
    if (dayjs().isAfter(dayjs(tokenExpireTime))) {
      const result = await fetch(`${Config['basic']}/auth/token/refresh?refreshToken=${refreshToken}`).then(response =>
        response.json()
      );
      const { data } = result;
      storageService.updateStorage(StorageToken.Token, data);
      // 对request的header增加accessToken配置
      config['headers'].set('accessToken', data.accessToken! as string);
    } else {
      // 对request的header增加accessToken配置
      config['headers'].set('accessToken', accessToken! as string);
    }
    return config;
  });

  return instance;
};
