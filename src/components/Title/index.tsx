/*
 * @文件描述: title组件
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 陈杰
 * @Date: 2020-01-07 15:35:12
 * @LastEditTime: 2020-03-21 10:28:28
 */
import React from 'react';
import { Text, View } from 'react-native';
import { Size, Color } from '../../config';
import { WingBlank } from '@ant-design/react-native';

const { px } = Size;

const Title = ({
  title,
  textAlign = 'left'
}: {
  title: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}) => {
  return (
    <WingBlank>
      <View
        style={{
          backgroundColor: Color.white,
          height: px(48)
        }}>
        <Text
          style={{
            fontSize: px(18),
            lineHeight: px(48),
            color: Color.mainTextColor,
            fontWeight: '600',
            textAlign: textAlign
            // fontFamily: 'SFProDisplay-Semibold,SFProDisplay',
          }}>
          {title}
        </Text>
      </View>
    </WingBlank>
  );
};

export default Title;
