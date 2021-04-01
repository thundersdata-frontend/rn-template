import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Address from 'modules/user/screens/address';
import TabStack from 'stacks/tabStack';

const Stack = createNativeStackNavigator();

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

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={{ gestureEnabled: true, headerBackTitleVisible: false }}>
      {screens.map(screen => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;
