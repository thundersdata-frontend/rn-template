/*
 * @文件描述: 可点击的tag标签
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-05-06 10:42:25
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-06 17:53:48
 */
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Size, Color } from '../../config';

interface BlockItemInter {
  isSelected: boolean;
  name: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isWithIcon?: boolean;
}

const BlockItem = ({ isSelected, name, onPress, style, isWithIcon }: BlockItemInter) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.wrap, isSelected && styles.selectedWrap, style]}>
        <Text style={[styles.text, isSelected && styles.selectedText]}>{name}</Text>
        {isWithIcon && isSelected && (
          <Image
            source={require('../../assets/icons/icon_tag_cancel_blue.png')}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: Size.px(12),
              height: Size.px(12)
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: Size.px(32),
    lineHeight: Size.px(32),
    marginRight: Size.px(8),
    backgroundColor: Color.backgroundColor,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Size.px(19),
    marginBottom: Size.px(8)
  },
  selectedWrap: {
    backgroundColor: 'rgba(62,154,249,0.15)'
  },
  text: {
    fontSize: Size.px(14),
    color: Color.middleTextColor
  },
  selectedText: {
    color: Color.primary
  }
});

export default BlockItem;
