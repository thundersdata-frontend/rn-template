/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-14 11:16:15
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-01-15 16:31:09
 */
import { StyleSheet } from 'react-native';
import Color from './color';
import Size from './size';

const htmlStyle = StyleSheet.create({
  a: {
    color: Color.primary,
    fontSize: Size.px(14),
    fontWeight: '500'
  },
  div: {
    lineHeight: Size.px(24),
    fontSize: Size.px(14),
    color: Color.dark
  }
});
export default htmlStyle;
