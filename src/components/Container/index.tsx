/*
 * @文件描述: 通用的页面容器组件，包含了SafeAreaView和StatusBar
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-15 17:00:10
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:54:13
 */
import React from 'react';
import { StatusBar, ViewStyle, StyleProp } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Color } from '../../config';
import { useHeaderHeight } from '@react-navigation/stack';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
}
const Container: React.FC<ContainerProps> = props => {
  const height = useHeaderHeight();

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Color.white, marginTop: height }, props.style]}
      forceInset={{ top: 'never' }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {props.children}
    </SafeAreaView>
  );
};

export default Container;
