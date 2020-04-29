/*
 * @文件描述: 根据模板封装的listItem
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-29 10:37:52
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-29 10:42:49
 */
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { List } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';

interface CustomItemProps {
  title: ReactNode | string; // 主标题
  extra?: ReactNode | string; //右面的文字
  brief?: string; //主标题下面的附标题
  thumb?: ReactNode | null; //图标
  navigateTo?: string; //跳转的stackname
  style?: StyleProp<ViewStyle>; // 自定义style
}

const CustomItem = ({ title, brief, thumb, navigateTo, style, extra }: CustomItemProps) => {
  const Item = List.Item;
  const Brief = Item.Brief;
  const navigation = useNavigation();

  return brief ? (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      arrow={navigateTo && 'horizontal'}
      onPress={navigateTo ? () => navigation.navigate(navigateTo) : undefined}>
      {title}
      <Brief>{brief}</Brief>
    </Item>
  ) : (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      arrow={navigateTo && 'horizontal'}
      onPress={navigateTo ? () => navigation.navigate(navigateTo) : undefined}>
      {title}
    </Item>
  );
};
export default CustomItem;
