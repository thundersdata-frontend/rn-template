import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Test1 from '../../screens/test1';
import Test2 from '../../screens/test2';
import { Text } from 'react-native';
import { Size, Color } from '../../config';
import { Icon } from '@ant-design/react-native';
import { IconNames } from '@ant-design/react-native/lib/icon';

const Tab = createBottomTabNavigator();

export default function TabStack() {
  const tabItems = [
    {
      name: 'Test1',
      component: Test1,
      label: '测试1',
      icon: 'home',
      badgeCount: 2
    },
    {
      name: 'Test2',
      component: Test2,
      label: '测试2',
      icon: 'bars',
      badgeCount: 10
    }
  ];

  return (
    <Tab.Navigator initialRouteName="HomePage" lazy={true}>
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? Color.mainTextColor : Color.middleTextColor, fontSize: Size.px(10) }}>
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon name={item.icon as IconNames} size={24} color={focused ? Color.primary : Color.mainTextColor} />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
