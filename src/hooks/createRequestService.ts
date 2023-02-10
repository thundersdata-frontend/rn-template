import { LoginFailureEnum } from '@/enums';

export default function createRequestService<P extends any[], R>(
  signedIn: boolean,
  isOnline: boolean,
  service: (...args: P) => Promise<R>
) {
  const requestService = async (...args: P) => {
    if (!isOnline) {
      throw new Error(
        JSON.stringify({
          success: false,
          message: '网络连接异常',
        })
      );
    }
    if (!signedIn) {
      throw new Error(JSON.stringify({ code: LoginFailureEnum.登录过期 }));
    }
    return service(...args);
  };

  return requestService;
}
