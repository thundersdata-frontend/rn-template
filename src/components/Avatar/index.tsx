/*
 * @文件描述: 封装的头像组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-15 10:17:42
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-28 14:34:54
 */
import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { Size, Color } from '../../config';

interface AvatarProps {
  uri?: string;
  width?: number;
  style?: ImageStyle;
}
const Avatar: React.FC<AvatarProps> = ({ uri, width = 28, style }) => (
  <Image
    source={
      uri
        ? {
            uri
          }
        : require('../../assets/pic_avatar_default.png')
    }
    style={[
      {
        width,
        height: width,
        borderRadius: width / 2,
        borderWidth: Size.ONE_PIXEL,
        borderColor: Color.borderColor
      },
      style
    ]}
    resizeMode="contain"
  />
);
export default Avatar;
