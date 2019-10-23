import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Size, Colors } from '../../config';

const Input: React.FC<TextInputProps> = ({ style, ...props }) => <TextInput style={[styles.input, style]} {...props} />;

export default Input;

const styles = StyleSheet.create({
  input: {
    color: Colors.black,
    height: Size.px(40),
    padding: 0,
  },
});
