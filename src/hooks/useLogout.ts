import { useMemoizedFn } from '@td-design/rn-hooks';
import { useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { signedInAtom, tokenAtom, userInfoAtom } from '@/atoms';

export default function useLogout() {
  const updateUserInfo = useSetAtom(userInfoAtom);
  const updateSignedIn = useSetAtom(signedInAtom);
  const updateToken = useSetAtom(tokenAtom);

  const logout = () => {
    updateUserInfo(RESET);
    updateSignedIn(RESET);
    updateToken(RESET);
  };

  return useMemoizedFn(logout);
}
