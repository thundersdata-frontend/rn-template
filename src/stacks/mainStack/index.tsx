import { FC } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Address } from 'modules/user/screens/address';
import { TabStack } from 'stacks/tabStack';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Tab',
    component: TabStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Address',
    component: Address,
    options: {
      headerTitle: '地址信息',
    },
  },
];

export const MainStack: FC<{ commonStackOptions: StackNavigationOptions }> = ({ commonStackOptions }) => {
  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={commonStackOptions}>
      {screens.map(screen => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
};
