import { FC } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Address } from 'modules/user/screens/address';
import { TabStack } from 'stacks/tabStack';
import { EchartsRoot } from 'modules/charts/screens/main';
import { LineChart } from 'modules/charts/screens/line';
import { MapChart } from 'modules/charts/screens/map';

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
  {
    name: 'Echarts',
    component: EchartsRoot,
    options: {
      headerTitle: '图表展示',
    },
  },
  {
    name: 'LineChart',
    component: LineChart,
    options: {
      headerTitle: '折线图',
    },
  },
  {
    name: 'MapChart',
    component: MapChart,
    options: {
      headerTitle: '山东地图',
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
