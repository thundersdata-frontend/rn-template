import { fetch } from '@react-native-community/netinfo';
import { useRequest } from '@td-design/rn-hooks';
import { LoginFailureEnum } from 'enums';
import { authAtom } from 'atoms';
import { signOut } from 'utils/auth';
import { useUpdateAtom } from 'jotai/utils';
import { useToast } from './useToast';
import type { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';

export function useCustomRequest<R, P extends any[] = []>(service: Service<R, P>, options?: Options<R, P>) {
  const updateAuth = useUpdateAtom(authAtom);

  const { toastFail } = useToast();

  const customService = async (...args: P) => {
    const state = await fetch();
    if (!state.isConnected) {
      throw new Error(
        JSON.stringify({
          success: false,
          message: '网络连接异常',
        }),
      );
    }
    return service(...args);
  };

  const { refreshDeps = [], onError, ...restOptions } = options || {};
  const result = useRequest(customService, {
    refreshDeps,
    onError: (error: any, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          signOut().then(() => {
            updateAuth({ signedIn: false });
          });
        } else {
          toastFail(message);
        }
      } catch (err) {
        toastFail((err as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
    },
    ...restOptions,
  });
  return result;
}
