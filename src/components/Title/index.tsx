/*
 * @文件描述: title组件
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-07 15:35:12
 * @LastEditTime: 2020-04-29 17:19:57
 */
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { Size, Color } from '../../config';

const { px } = Size;

const Title = ({
  title,
  textAlign = 'left',
  style
}: {
  title: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: ViewStyle;
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: Color.backgroundColor,
          height: px(32),
          paddingHorizontal: px(12),
          justifyContent: 'center'
        },
        style
      ]}>
      <Text
        style={{
          fontSize: px(11),
          color: Color.middleTextColor,
          fontWeight: '400',
          textAlign: textAlign
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
