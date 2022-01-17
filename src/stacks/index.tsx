import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';

import { MainStack } from './mainStack';
import { AuthStack } from './authStack';
import { CustomHeader } from 'components';
import { storageService } from 'services/StorageService';

export const Stack = () => {
  const commonStackOptions: StackNavigationOptions = {
    header: props => <CustomHeader {...props} />,
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  if (storageService.signedIn) return <MainStack {...{ commonStackOptions }} />;
  return <AuthStack {...{ commonStackOptions }} />;
};
