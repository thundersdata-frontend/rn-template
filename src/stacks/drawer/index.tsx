import React from 'react';
import { Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../../CustomDrawerContent';
import { Size } from '../../config';

import HomePage from '../../screens/home';
import Teams from '../../screens/team';
import LeagueHome from '../../screens/league';
import Mine from '../../screens/mine';
import Show from '../../screens/show';

const Drawer = createDrawerNavigator();
export default function DrawerStack() {
  /* 左滑抽屉的label和icon的匹配 */
  const drawerItems = [
    {
      name: 'HomePage',
      component: HomePage,
      label: '首页',
      icon: require('../../assets/icons/drawer_home.png')
    },
    {
      name: 'Show',
      component: Show,
      label: '展示',
      icon: require('../../assets/icons/drawer_me.png')
    },
    {
      name: 'Team',
      component: Teams,
      label: '球队',
      icon: require('../../assets/icons/drawer_team.png')
    },
    {
      name: 'League',
      component: LeagueHome,
      label: '联赛',
      icon: require('../../assets/icons/drawer_match.png')
    },
    {
      name: 'Mine',
      component: Mine,
      label: '我的',
      icon: require('../../assets/icons/drawer_me.png')
    }
  ];
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      lazy={true}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerItems.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            drawerLabel: () => <Text>{item.label}</Text>,
            drawerIcon: () => (
              <Image
                source={item.icon}
                style={{
                  width: Size.px(26),
                  height: Size.px(26)
                }}
                resizeMode="contain"
              />
            )
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
