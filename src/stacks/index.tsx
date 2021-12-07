import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import { useAtomValue } from 'jotai/utils';

import { MainStack } from './mainStack';
import { AuthStack } from './authStack';
import { authAtom } from 'atoms';
import { CustomHeader } from 'components';

export const Stack = () => {
  const auth = useAtomValue(authAtom);

  const commonStackOptions: StackNavigationOptions = {
    header: props => <CustomHeader {...props} />,
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  if (auth.signedIn) return <MainStack {...{ commonStackOptions }} />;
  return <AuthStack {...{ commonStackOptions }} />;
};
