import { LoginFailureEnum } from '@/enums';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createRequestService<P extends any[], R>(
  signedIn: boolean,
  service: (...args: P) => Promise<R>
) {
  const requestService = async (...args: P) => {
    if (!signedIn) {
      throw new Error(JSON.stringify({ code: LoginFailureEnum.登录无效 }));
    }
    return service(...args);
  };

  return requestService;
}
