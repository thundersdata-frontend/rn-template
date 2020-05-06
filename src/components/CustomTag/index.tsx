/*
 * @文件描述: tags(一般用为卡片组件的footer内的关键字)
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-27 16:45:41
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-06 18:08:12
 */
import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Size, Color } from '../../config';

interface CustomTagProps {
  style?: StyleProp<ViewStyle>;
  type?: 'blue' | 'green' | 'yellow' | 'red';
}

const CustomTag: React.FC<CustomTagProps> = ({ children, style, type = 'blue' }) => {
  const colorConfig = {
    blue: {
      bg: 'rgba(64,158,255,0.15)',
      text: '#409EFF'
    },
    green: {
      bg: 'rgba(6,179,91,0.15)',
      text: '#06B35B'
    },
    yellow: {
      bg: 'rgba(250,173,20,0.15)',
      text: '#FAAD14'
    },
    red: {
      bg: 'rgba(219,46,17,0.15)',
      text: '#DB2E11'
    }
  };

  const styles = StyleSheet.create({
    tag: {
      borderRadius: Size.px(12),
      backgroundColor: colorConfig[type].bg,
      flexDirection: 'row',
      padding: Size.px(2),
      overflow: 'visible',
      marginRight: Size.px(8)
    },
    wrap: {
      overflow: 'hidden',
      borderRadius: 2,
      borderWidth: Size.ONE_PIXEL,
      borderStyle: 'solid',
      borderColor: Color.borderColor,
      paddingVertical: 4,
      paddingHorizontal: 4
    },
    text: {
      fontSize: Size.px(12),
      textAlign: 'center',
      color: colorConfig[type].text
    }
  });

  return (
    <View style={[styles.tag, style]}>
      <View style={styles.wrap}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

export default CustomTag;
