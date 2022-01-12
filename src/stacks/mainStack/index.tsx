import { FC } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { TabStack } from 'stacks/tabStack';
import { EchartsRoot } from 'modules/charts/screens/main';
import { LineChart } from 'modules/charts/screens/line';
import { MapChart } from 'modules/charts/screens/map';
import { IndexBarDemo } from 'modules/homepage/screens/indexbar';
import { LocalModelDemo } from 'modules/homepage/screens/localmodel';
import { RecyclerListDemo } from 'modules/homepage/screens/recyclerlist';

import { Settings } from 'modules/user/screens/settings';
import { ModifyPassword } from 'modules/user/screens/modifyPass';

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
  {
    name: 'IndexBarDemo',
    component: IndexBarDemo,
    options: {
      headerTitle: '通讯录示例',
    },
  },
  {
    name: 'LocalModelDemo',
    component: LocalModelDemo,
    options: {
      headerTitle: '局部共享数据示例',
    },
  },
  {
    name: 'RecyclerListDemo',
    component: RecyclerListDemo,
    options: {
      headerTitle: 'RecyclerListView示例',
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      headerTitle: '系统设置',
    },
  },
  {
    name: 'ModifyPassword',
    component: ModifyPassword,
    options: {
      headerTitle: '修改密码',
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
