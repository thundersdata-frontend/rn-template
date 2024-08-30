import { Toast } from '@td-design/react-native';
import { useRequest } from '@td-design/rn-hooks';
import type { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { useAtomValue } from 'jotai';

import { permissionAtom, signedInAtom } from '@/atoms';

import useLogout from './useLogout';
import { useNotify } from './useNotify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCustomRequest<R, P extends any[] = []>(
  service: Service<R, P>,
  options?: Options<R, P> & { permission?: string }
) {
  const signedIn = useAtomValue(signedInAtom);
  const permissions = useAtomValue(permissionAtom);

  const { failNotify } = useNotify();
  const logout = useLogout();

  const { ready, permission, onBefore, onError, ...restOptions } = options || {};

  const result = useRequest(service, {
    ready: signedIn && ready,
    onBefore: (params: P) => {
      if (permission && !permissions.includes(permission)) {
        Toast.middle({ content: '对不起，您没有操作权限' });
        result.cancel();
      } else {
        onBefore?.(params);
      }
    },
    onError: (error: Error, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if (code === 401) {
          failNotify(message);
          logout();
        } else if (code === 1008103002 || code === 1008103003) {
          return;
        } else {
          failNotify(message);
        }
      } catch (err) {
        failNotify((err as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
      result.cancel();
    },
    ...restOptions,
  });
  return result;
}
