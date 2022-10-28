import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import Config from 'react-native-config';
import { storageService, StorageToken } from 'services/StorageService';
import { extend } from 'umi-request';

export const initRequest = async () => {
  const request = extend({
    timeout: 30000,
  });

  /** 使用中间件在请求前进行token的校验 */
  request.use(async (ctx, next) => {
    const token = storageService.token;
    if (isEmpty(token)) {
      next();
      return;
    }
    const { accessToken, refreshToken, tokenExpireTime } = token;

    // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
    if (dayjs().isAfter(dayjs(tokenExpireTime))) {
      const result = await fetch(`${Config['basic']}/auth/token/refresh?refreshToken=${refreshToken}`).then(response =>
        response.json()
      );
      const { data } = result;
      storageService.updateStorage(StorageToken.Token, data);
      // 对request的header增加accessToken配置
      ctx.req.options = {
        ...ctx.req.options,
        headers: {
          ...ctx.req.options.headers,
          accessToken: data.accessToken!,
        },
      };
      next();
    } else {
      // 对request的header增加accessToken配置
      ctx.req.options = {
        ...ctx.req.options,
        headers: {
          ...ctx.req.options.headers,
          accessToken: accessToken!,
        },
      };
      next();
    }
  });
  return request;
};
