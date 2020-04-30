/*
 * @文件描述: 根据模板封装的listItem
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-29 10:37:52
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-30 16:09:04
 */
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { List } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemText from '../ListItemText';

interface CustomItemProps {
  title: ReactNode | string; // 主标题
  extra?: ReactNode | string; //右面的文字
  brief?: string; //主标题下面的附标题
  thumb?: ReactNode | null; //图标
  navigateTo?: string; //跳转的stackname
  onPress?: () => void;
  style?: StyleProp<ViewStyle>; // 自定义style
  isError?: boolean;
}

const CustomItem = ({ title, brief, thumb, onPress, style, extra, navigateTo, isError }: CustomItemProps) => {
  const Item = List.Item;
  const Brief = Item.Brief;
  const navigation = useNavigation();

  return brief ? (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      arrow={(navigateTo || onPress) && 'horizontal'}
      onPress={navigateTo ? () => navigation.navigate(navigateTo) : onPress}>
      {typeof title === 'string' ? <ListItemText isError={isError} text={title} /> : title}
      <Brief>{brief}</Brief>
    </Item>
  ) : (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      arrow={(navigateTo || onPress) && 'horizontal'}
      onPress={navigateTo ? () => navigation.navigate(navigateTo) : onPress}>
      {typeof title === 'string' ? <ListItemText isError={isError} text={title} /> : title}
    </Item>
  );
};

export default CustomItem;
