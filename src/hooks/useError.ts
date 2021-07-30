import { authAtom } from 'atoms';
import { LoginFailureEnum } from 'enums';
import { useUpdateAtom } from 'jotai/utils';
import { useCallback } from 'react';
import { signOut } from 'utils/auth';

export function useError() {
  const updateAuth = useUpdateAtom(authAtom);

  const convertErrorMsg = useCallback(
    (error: Error) => {
      try {
        if (error.message.toLocaleLowerCase() === 'network request failed') {
          return '网络请求失败';
        } else if (error.message.toLocaleLowerCase().includes('timeout of')) {
          return '网络请求超时';
        }
        const { message, code } = JSON.parse(error.message);
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          signOut().then(() => {
            updateAuth({ signedIn: false });
          });
          return LoginFailureEnum[code];
        }
        return message;
      } catch (error) {
        return error.message;
      }
    },
    [updateAuth],
  );

  return {
    convertErrorMsg,
  };
}
