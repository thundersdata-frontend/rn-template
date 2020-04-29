import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Test1 from '../../screens/test1';
import Test2 from '../../screens/test2';
import { Text, View } from 'react-native';
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
    <Tab.Navigator
      tabBarOptions={{
        style: {},
        labelStyle: {
          marginBottom: Size.px(1)
        },
        tabStyle: {}
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const matchTab = tabItems.find(item => item.name === route.name);
          return (
            <View style={{ width: 24, height: 24, margin: 0 }}>
              <Icon
                name={matchTab?.icon as IconNames}
                size={24}
                color={focused ? Color.primary : Color.middleTextColor}
              />
              {matchTab?.badgeCount && (
                <View
                  style={{
                    // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                    position: 'absolute',
                    right: -8,
                    top: -1,
                    backgroundColor: '#FA3A22',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: '400' }}>{matchTab?.badgeCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{
                color: focused ? Color.primary : Color.middleTextColor,
                fontWeight: '400',
                fontSize: Size.px(10)
              }}>
              {tabItems.find(item => item.name === route.name)?.label}
            </Text>
          );
        }
      })}>
      {tabItems.map(item => (
        <Tab.Screen key={item.name} name={item.name} component={item.component} />
      ))}
    </Tab.Navigator>
  );
}
