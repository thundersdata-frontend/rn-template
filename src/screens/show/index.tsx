/*
 * @文件描述: 展示
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-28 10:47:39
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-29 10:48:48
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Color, Size } from '../../config';
import { Tabs } from '@ant-design/react-native';
import Container from '../../components/Container';
import BackgroundImgHeader from '../../components/BackgroundImgHeader';
import Iconfont from '../../components/Iconfont';
import Avatar from '../../components/Avatar';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import store from '../../store';
import List from './components/List';

const { px } = Size;
const Profile = (props: StackHeaderProps) => {
  const [state] = store.useModel('user');

  return (
    <Container style={{ marginTop: 0, backgroundColor: Color.backgroundColor }}>
      <BackgroundImgHeader
        showRadius={false}
        backgroundImg={require('../../images/pic_my_head.png')}
        leftIcon={<Iconfont name="navMenu" size={Size.px(20)} color={Color.white} />}
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        {...props}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            uri={state.avatar}
            width={px(54)}
            style={{ borderWidth: px(3), borderColor: 'rgba(255,255,255,0.2)' }}
          />
          <Text style={{ fontSize: px(18), fontWeight: '500', color: Color.white, marginTop: Size.px(10) }}>
            {state.name || '用户名'}
          </Text>
        </View>
      </BackgroundImgHeader>
      <Tabs tabs={[{ title: '列表' }, { title: '卡片' }, { title: '图表' }, { title: '设置' }]} swipeable={false}>
        <List />
        {/* <Card /> */}
        {/* <Module /> */}
        {/* <Setting /> */}
      </Tabs>
    </Container>
  );
};

export default Profile;
