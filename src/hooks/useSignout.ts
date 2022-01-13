import { useMemoizedFn } from '@td-design/rn-hooks';
import { authAtom, userInfoAtom } from 'atoms';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

export function useSignout() {
  const [signedIn, updateAuth] = useAtom(authAtom);
  const updateUserInfo = useUpdateAtom(userInfoAtom);

  const signOut = () => {
    updateAuth(false);
    updateUserInfo({});
  };

  return {
    signedIn,

    signOut: useMemoizedFn(signOut),
  };
}
