import { useMemoizedFn } from '@td-design/rn-hooks';
import { LoginFailureEnum } from 'enums';
import { storageService } from '../services/StorageService';

export function useError() {
  const { signOut } = storageService;

  const convertErrorMsg = useMemoizedFn((error: unknown) => {
    try {
      // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings
      if (error instanceof Error) {
        if (error.message.toLocaleLowerCase() === 'network request failed') {
          return '网络请求失败';
        } else if (error.message.toLocaleLowerCase().includes('timeout of')) {
          return '网络请求超时';
        }
        const { message, code } = JSON.parse(error.message);
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          signOut();
          return LoginFailureEnum[code];
        }
        return message;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  });

  return {
    convertErrorMsg,
  };
}
