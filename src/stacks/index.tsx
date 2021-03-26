import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAtomValue } from 'jotai/utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { CardStyleInterpolators, StackHeaderLeftButtonProps, StackNavigationOptions } from '@react-navigation/stack';

import MainStack from './mainStack';
import AuthStack from './authStack';
import authService from 'modules/auth/authService';

export default () => {
  const auth = useAtomValue(authService.authAtom);

  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 18,
    },
    headerTitleAlign: 'center',
    headerLeft: (props: StackHeaderLeftButtonProps) =>
      props.canGoBack && (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
      ),
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  if (auth.signedIn) return <MainStack {...screenOptions} />;
  return <AuthStack {...screenOptions} />;
};
