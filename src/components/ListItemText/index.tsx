/*
 * @文件描述: 列表项文字封装
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-13 15:18:04
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-03-25 10:45:02
 */
import React from 'react';
import { Text } from 'react-native';
import { Size, Color } from '../../config';

export default function ListItemText({ text, required = false }: { text?: string; required?: boolean }) {
  return (
    <Text style={{ fontSize: Size.px(14), lineHeight: Size.px(27), color: Color.middleTextColor }}>
      {required ? <Text style={{ color: Color.primary }}>*</Text> : null}
      {text}
    </Text>
  );
}
