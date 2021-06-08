import { useTheme } from '@shopify/restyle';
import { helpers } from '@td-design/react-native';
import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import { useAtomValue } from 'jotai/utils';

import { MainStack } from './mainStack';
import { AuthStack } from './authStack';
import { authAtom } from 'modules/auth/authService';
import { AppTheme } from 'theme';

const { px } = helpers;
export const Stack = () => {
  const auth = useAtomValue(authAtom);
  const theme = useTheme<AppTheme>();

  const commonStackOptions: StackNavigationOptions = {
    headerTitleStyle: {
      fontWeight: '500',
      color: theme.colors.gray500,
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
