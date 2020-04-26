/*
 * @文件描述: 带背景图片的header
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 陈杰
 * @Date: 2020-01-07 15:35:12
 * @LastEditTime: 2020-04-16 18:22:28
 */
import React from 'react';
import { ImageBackground, View, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Size, Color } from '../../config';
import { StackHeaderProps } from '@react-navigation/stack';
import { IconOutline } from '@ant-design/icons-react-native';
import { isIOS, androidNotchHeight, iosNotchHeight } from '../../config/size';
import hasNotch from '../../utils/hasNotch';

const { px } = Size;

interface BackgroundImgHeaderProps extends StackHeaderProps {
  backgroundImg: ImageSourcePropType;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  showRadius?: boolean;
  onPress?: () => void;
  height?: number;
}

const BackgroundImgHeader: React.FC<BackgroundImgHeaderProps> = ({
  showRadius = true,
  backgroundImg,
  leftIcon,
  rightIcon,
  navigation,
  onPress,
  height = px(212),
  children
}) => {
  return (
    <ImageBackground
      source={backgroundImg}
      style={{
        width: '100%',
        height,
        paddingTop: hasNotch() ? (isIOS() ? iosNotchHeight() : androidNotchHeight() - 10) : px(15)
      }}>
      <View
        style={{
          paddingVertical: px(15),
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginLeft: Size.px(5), padding: Size.px(10) }}
          onPress={() => {
            if (onPress) {
              onPress();
            } else {
              navigation.goBack();
            }
          }}>
          {leftIcon || <IconOutline name="left" color={Color.white} size={Size.px(24)} />}
        </TouchableOpacity>
        {rightIcon || <View />}
      </View>
      {children}
      {showRadius && (
        <View
          style={{
            width: Size.DEVICE_WIDTH,
            backgroundColor: Color.white,
            height: px(10),
            borderTopLeftRadius: px(10),
            borderTopRightRadius: px(10),
            position: 'absolute',
            bottom: 0
          }}
        />
      )}
    </ImageBackground>
  );
};

export default BackgroundImgHeader;
