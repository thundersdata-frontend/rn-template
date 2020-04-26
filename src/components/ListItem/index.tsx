/*
 * @文件描述: 封装的列表项组件，有统一的边距
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-15 10:43:29
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-03-27 15:59:40
 */
import React from 'react';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { Color, Size } from '../../config';

interface ListItemProps {
  size?: 'lg' | 'md' | 'sm';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  last?: boolean;
  disabled?: boolean;
}
const ListItem: React.FC<ListItemProps> = props => {
  const content = (
    <WingBlank size={props.size}>
      <WhiteSpace size={props.size} />
      {props.children}
      <WhiteSpace size={props.size} />
    </WingBlank>
  );
  if (props.onPress) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        style={[styles.itemWrap, props.style]}
        onPress={props.onPress}
        activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.itemWrap, props.style, props.last ? { borderBottomWidth: 0 } : {}]}>{content}</View>;
};
ListItem.defaultProps = {
  size: 'lg'
};

const styles = StyleSheet.create({
  itemWrap: {
    borderColor: Color.borderColor,
    borderBottomWidth: Size.ONE_PIXEL,
    backgroundColor: Color.white
  }
});

export default ListItem;
