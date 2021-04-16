import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Icon, Theme, useTheme } from '@td-design/react-native';

import Homepage from 'modules/homepage/screens';
import Mine from 'modules/user/screens/mine';

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
  const theme = useTheme<Theme>();
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
                  color: focused ? theme.colors.primaryText_1 : theme.colors.primaryText_2,
                  fontSize: 10,
                  marginBottom: 5,
                }}
              >
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Icon type="custom" name={item.focusedIcon} size={20} color={theme.colors.primaryText_1} />
              ) : (
                <Icon type="custom" name={item.icon} size={20} color={theme.colors.primaryText_2} />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabStack;
