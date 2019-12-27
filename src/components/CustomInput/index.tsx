import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, ViewStyle } from 'react-native';
import { Size, Colors } from '../../config';
import Iconfont from '../Iconfont';

export type CustomInputProps = Merge<
  TextInputProps,
  {
    onChange?: (value: string) => void;
    value?: string | number;
    error?: string[];
    icon?: string;
    style?: ViewStyle;
  }
>;

const CustomInput: React.FC<CustomInputProps> = props => {
  const { style, onChange, value, icon, ...restProps } = props;
  const [useValue, setUseValue] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      setUseValue('' + value);
    }
  }, [value]);

  const handleChange = (value: string) => {
    setUseValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <View style={[styles.content, style]}>
      {icon && <Iconfont style={styles.icon} name={icon} size={Size.px(16)} color={Colors.labelColor} />}
      <TextInput value={useValue} onChangeText={handleChange} style={styles.input} {...restProps} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    flex: 9,
    color: Colors.black,
    height: Size.px(30),
    padding: 0,
  },
  icon: {
    flex: 1,
    height: Size.px(30),
    lineHeight: Size.px(30),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Size.px(30),
    paddingLeft: Size.px(8),
    borderWidth: Size.ONE_PIXEL,
    borderColor: Colors.borderColor,
    borderRadius: Size.px(4),
  },
});
