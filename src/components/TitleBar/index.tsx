/*
 * @文件描述: 导航栏顶部
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-13 15:24:29
 * @LastEditTime: 2020-03-27 15:24:17
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Header, StackHeaderProps } from '@react-navigation/stack';

const TitleBar = (props: StackHeaderProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#434343', '#1C1A19']}
      style={{ padding: 0, margin: 0 }}>
      <Header {...props} />
    </LinearGradient>
  );
};

export default TitleBar;
