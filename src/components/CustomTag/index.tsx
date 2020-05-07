/*
 * @文件描述: tags(一般用为卡片组件的footer内的关键字)
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-27 16:45:41
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-07 15:56:50
 */
import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Size, Color } from '../../config';
import CheckableTag from '../CheckableTag';
import { Flex } from '@ant-design/react-native';

const px = Size.px;

interface CustomTagProps {
  style?: StyleProp<ViewStyle>;
  type?: 'blue' | 'green' | 'yellow' | 'red';
  children: React.ReactNode;
}

const InternalTag: React.FC<CustomTagProps> = ({ children, style, type = 'blue' }) => {
  const colorConfig = {
    blue: {
      bg: 'rgba(64,158,255,0.15)',
      text: Color.primary
    },
    green: {
      bg: 'rgba(6,179,91,0.15)',
      text: Color.success
    },
    yellow: {
      bg: 'rgba(250,173,20,0.15)',
      text: Color.warning
    },
    red: {
      bg: 'rgba(219,46,17,0.15)',
      text: Color.fail
    }
  };

  const styles = StyleSheet.create({
    wrap: {
      borderRadius: px(24),
      paddingHorizontal: px(12),
      height: px(24),
      backgroundColor: colorConfig[type].bg,
      marginRight: px(8)
    },
    text: {
      fontSize: px(12),
      color: colorConfig[type].text
    }
  });

  return (
    <Flex style={[styles.wrap, style]} align="center" justify="center">
      <Text style={styles.text}>{children}</Text>
    </Flex>
  );
};
export interface TagType extends React.ExoticComponent<CustomTagProps> {
  CheckableTag: typeof CheckableTag;
}
const CustomTag = (InternalTag as unknown) as TagType;
CustomTag.CheckableTag = CheckableTag;
export default CustomTag;
