import React from 'react';
import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Size, Color } from '../../config';

const Input: React.FC<TextInputProps> = ({ style, ...props }) => (
  <TextInput
    placeholderTextColor={Color.placeholderTextColor}
    style={[styles.input, style] as StyleProp<TextStyle>}
    {...props}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    color: Color.mainTextColor,
    height: Size.px(44),
    padding: 0,
    fontSize: Size.px(14)
  }
});
