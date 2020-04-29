import React from 'react';
import { Text, Image, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../../CustomDrawerContent';
import { Size, Color } from '../../config';

import HomePage from '../../screens/home';
import Teams from '../../screens/team';
import LeagueHome from '../../screens/league';
import Mine from '../../screens/mine';
import Show from '../../screens/show';
import { IconOutline } from '@ant-design/icons-react-native';

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
      rightIcon: <IconOutline name="right" size={18} color={Color.placeholderTextColor} />,
      icon: require('../../assets/icons/drawer_match.png')
    },
    {
      name: 'Mine',
      component: Mine,
      label: '我的'
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
            drawerLabel: () => (
              <View style={{ flexDirection: 'row' }}>
                <Text>{item.label}</Text>
                {item.rightIcon}
              </View>
            ),
            drawerIcon: () =>
              item.icon ? (
                <Image
                  source={item.icon}
                  style={{
                    width: Size.px(24),
                    height: Size.px(24),
                    // drawerItem中默认有icon的时候label的marginLeft为32，且不可覆盖，只能通过icon的marginRight为负值进行覆盖
                    marginRight: -Size.px(20)
                  }}
                  resizeMode="contain"
                />
              ) : null
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
