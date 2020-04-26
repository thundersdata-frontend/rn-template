import React from 'react';
import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Size, Color } from '../../config';

const Input: React.FC<TextInputProps> = ({ style, ...props }) => (
  <TextInput style={[styles.input, style] as StyleProp<TextStyle>} {...props} />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    color: Color.black,
    height: Size.px(40),
    padding: 0
  }
});
