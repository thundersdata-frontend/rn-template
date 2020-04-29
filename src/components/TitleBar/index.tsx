/*
 * @文件描述: 导航栏顶部
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-13 15:24:29
 * @LastEditTime: 2020-04-28 10:12:41
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Header, StackHeaderProps } from '@react-navigation/stack';

const TitleBar = (props: StackHeaderProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#69C0FF', '#096DD9']}
      style={{ padding: 0, margin: 0 }}>
      <Header {...props} />
    </LinearGradient>
  );
};

export default TitleBar;
