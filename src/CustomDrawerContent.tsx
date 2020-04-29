/*
 * @文件描述: 自定义抽屉栏
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-02 16:45:22
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-28 13:54:28
 */
import React from 'react';
import { DrawerItemList, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
import { Size, Color } from './config';
import { useHeaderHeight } from '@react-navigation/stack';

export default function CustomDrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const height = useHeaderHeight();

  return (
    <ScrollView style={{ paddingTop: height }}>
      <DrawerItemList
        {...props}
        activeTintColor={'rgba(0, 0, 0, 0.04)'}
        inactiveTintColor={Color.mainTextColor}
        labelStyle={{
          fontSize: Size.px(16),
          lineHeight: Size.px(22),
          marginLeft: 0
        }}
        itemStyle={{
          marginHorizontal: 0,
          marginVertical: Size.px(0),
          height: Size.px(44),
          borderBottomColor: Color.borderColor,
          borderBottomWidth: Size.ONE_PIXEL,
          paddingLeft: Size.px(8),
          borderRadius: 0,
          justifyContent: 'center'
        }}
      />
    </ScrollView>
  );
}
