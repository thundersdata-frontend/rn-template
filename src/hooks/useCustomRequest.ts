import { useRequest } from '@td-design/rn-hooks';
import { LoginFailureEnum } from 'enums';
import { useToast } from './useToast';
import type { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { storageService } from '../services/StorageService';
import { useAtomValue } from 'jotai/utils';
import { isOnlineAtom } from './useNetwork';

export function useCustomRequest<R, P extends any[] = []>(service: Service<R, P>, options?: Options<R, P>) {
  const { signOut } = storageService;
  const { toastFail } = useToast();
  const isOnline = useAtomValue(isOnlineAtom);

  const customService = async (...args: P) => {
    if (!isOnline) {
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
          signOut();
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
