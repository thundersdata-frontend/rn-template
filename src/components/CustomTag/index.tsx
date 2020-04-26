import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Size, Color } from '../../config';

const CustomTag: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ children, style }) => {
  return (
    <View style={[styles.tag, style]}>
      <View style={styles.wrap}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    overflow: 'visible'
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
    textAlign: 'center'
  }
});

export default CustomTag;
