import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from 'modules/homepage/screens';
import Mine from 'modules/user/screens/mine';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const tabItems = [
  {
    name: 'Homepage',
    component: Homepage,
    label: '首页',
    icon: 'tab_home_non',
    focusedIcon: 'tab_home_sel',
    tabBarVisible: true,
  },
  {
    name: 'Mine',
    component: Mine,
    label: '我的',
    icon: 'tab_me_non',
    focusedIcon: 'tab_me_sel',
    tabBarVisible: true,
  },
];

const TabStack = () => {
  return (
    <Tab.Navigator initialRouteName="Homepage" lazy={true}>
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            tabBarVisible: item.tabBarVisible,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? '#000' : '#666',
                  fontSize: 10,
                }}>
                {item?.label}
              </Text>
            ),
            // tabBarIcon: ({ focused }) =>
            //   focused ? (
            //     <Iconfont name={item.focusedIcon} size={Size.px(20)} color={Color.primary} />
            //   ) : (
            //     <Iconfont name={item.icon} size={Size.px(20)} color={Color.middleTextColor} />
            //   ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabStack;
