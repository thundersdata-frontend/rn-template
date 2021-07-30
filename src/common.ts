import { extend, ResponseError } from 'umi-request';
import dayjs from 'dayjs';

import { LoginFailureEnum } from './enums';
import { getToken, saveToken } from 'utils/auth';
import Config from 'react-native-config';
import { isEmpty } from 'lodash';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
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
  405: 'xxxx',
};

export function errorHandler(error: ResponseError) {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    throw new Error(
      JSON.stringify({
        message: errorText,
        description: `请求错误 ${status}: ${url}`,
      }),
    );
  }
  throw error;
}

export const initRequest = async () => {
  const request = extend({
    timeout: 30000,
    errorHandler,
  });

  /** 使用中间件在请求前进行token的校验 */
  request.use(async (ctx, next) => {
    try {
      const token = await getToken();
      if (isEmpty(token)) {
        await next();
        return;
      }
      const { accessToken, refreshToken, tokenExpireTime } = token;

      // 判断当前日期是否晚于tokenExpireTime，如果是表示token已经过期，需要用refreshToken去换一个新的token
      if (dayjs().isAfter(dayjs(tokenExpireTime))) {
        const result = await fetch(`${Config['basic']}/auth/token/refresh?refreshToken=${refreshToken}`).then(
          response => response.json(),
        );
        const { data } = result;
        saveToken(data);
        // 对request的header增加accessToken配置
        ctx.req.options = {
          ...ctx.req.options,
          headers: {
            ...ctx.req.options.headers,
            accessToken: data.accessToken!,
          },
        };
        await next();
      } else {
        // 对request的header增加accessToken配置
        ctx.req.options = {
          ...ctx.req.options,
          headers: {
            ...ctx.req.options.headers,
            accessToken: accessToken!,
          },
        };
        await next();
      }
    } catch (error) {
    } finally {
      if (ctx.res) {
        const { code } = ctx.res;
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          throw new Error('LoginFailure');
        }
      }
    }
  });
  return request;
};
