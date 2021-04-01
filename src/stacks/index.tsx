import React from 'react';
import { useAtomValue } from 'jotai/utils';

import MainStack from './mainStack';
import AuthStack from './authStack';
import authService from 'modules/auth/authService';

export default () => {
  const auth = useAtomValue(authService.authAtom);

  if (auth.signedIn) return <MainStack />;
  return <AuthStack />;
};
