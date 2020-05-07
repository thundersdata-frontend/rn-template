/*
 * @文件描述: 列表项文字封装
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-13 15:18:04
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-06 17:53:35
 */
import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Size, Color } from '../../config';

export default function ListItemText({
  text,
  required = false,
  isError = false,
  style
}: {
  text?: string;
  required?: boolean;
  isError?: boolean;
  style?: TextStyle;
}) {
  return (
    <Text
      style={[{ fontSize: Size.px(14), fontWeight: '400', color: isError ? Color.red : Color.mainTextColor }, style]}>
      {required ? <Text style={{ color: Color.red }}>*</Text> : null}
      {text}
    </Text>
  );
}
