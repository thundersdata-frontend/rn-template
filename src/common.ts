import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import { LoginFailureEnum } from './enums';
import { getToken } from 'utils/auth';

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
  const token = await getToken();
  const request = extend({
    timeout: 10000,
    headers: {
      accessToken: token,
    },
    errorHandler,
  });

  request.interceptors.response.use(response => {
    response
      .clone()
      .json()
      .then(res => {
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(res.code)) {
          throw new Error('LoginFailure');
        }
      });
    return response;
  });

  return request;
};
