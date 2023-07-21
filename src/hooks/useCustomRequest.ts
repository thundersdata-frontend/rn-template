import { useRequest } from '@td-design/rn-hooks';
import type { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { useAtomValue } from 'jotai';

import { signedInAtom } from '@/atoms';
import { LoginFailureEnum } from '@/enums';

import useLogout from './useLogout';
import { useNotify } from './useNotify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCustomRequest<R, P extends any[] = []>(service: Service<R, P>, options?: Options<R, P>) {
  const { failNotify } = useNotify();
  const signedIn = useAtomValue(signedInAtom);
  const logout = useLogout();

  const { ready, onError, ...restOptions } = options || {};
  const result = useRequest(service, {
    ready: signedIn && ready,
    onError: (error: Error, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录禁止].includes(code)) {
          failNotify(message);
          logout();
        } else {
          failNotify(message);
        }
      } catch (err) {
        failNotify((err as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
    },
    ...restOptions,
  });
  return result;
}
