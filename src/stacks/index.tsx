import React from 'react';
import { helpers, useTheme, Theme } from '@td-design/react-native';
import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import { useAtomValue } from 'jotai/utils';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { authAtom } from 'modules/auth/authService';

const { px } = helpers;
export default () => {
  const auth = useAtomValue(authAtom);
  const theme = useTheme<Theme>();

  const commonStackOptions: StackNavigationOptions = {
    headerTitleStyle: {
      fontWeight: '500',
      color: theme.colors.primaryText_1,
      fontSize: px(18),
    },
    headerTitleAlign: 'center',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  if (auth.signedIn) return <MainStack {...{ commonStackOptions }} />;
  return <AuthStack {...{ commonStackOptions }} />;
};
