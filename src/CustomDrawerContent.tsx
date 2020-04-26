/*
 * @文件描述: 自定义抽屉栏
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-02 16:45:22
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-02 18:10:32
 */
import React from 'react';
import { DrawerItemList, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { ImageBackground, Text, ScrollView } from 'react-native';

import { Size, Color } from './config';
import Avatar from './components/Avatar';
import { getDefaultHeaderHeight } from './config/size';
import store from './store';

export default function CustomDrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const [state] = store.useModel('user');

  return (
    <ScrollView>
      <ImageBackground
        source={require('./images/bg_drawer.png')}
        style={{
          width: '100%',
          height: Size.px(210),
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: getDefaultHeaderHeight()
        }}>
        <Avatar uri={state.avatar} width={Size.px(72)} style={{ borderWidth: Size.px(3) }} />
        <Text style={{ color: Color.white, fontSize: Size.px(18), lineHeight: Size.px(27) }}>{state.name}</Text>
      </ImageBackground>
      <DrawerItemList
        {...props}
        activeTintColor={'rgba(0, 0, 0, 0.04)'}
        inactiveTintColor={Color.mainTextColor}
        labelStyle={{
          fontSize: Size.px(16),
          lineHeight: Size.px(18)
        }}
        itemStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          paddingVertical: Size.px(15),
          paddingLeft: Size.px(20),
          borderRadius: 0,
          justifyContent: 'center'
        }}
      />
    </ScrollView>
  );
}
