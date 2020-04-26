/**
 * 样式改造后的Picker组件
 */
import React from 'react';
import { Picker } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { Size, Color } from '../../config';
import { PickerPropsType } from '@ant-design/react-native/lib/picker/PropsType';

export type CustomPickerProps = PickerPropsType;

const CustomPicker: React.FC<CustomPickerProps> = ({ children, ...restProps }) => {
  return (
    <Picker
      {...restProps}
      okText={'确定'}
      dismissText={'取消'}
      styles={pickerStyles}
      itemStyle={{ paddingTop: Size.px(10), paddingBottom: Size.px(10) }}>
      {children}
    </Picker>
  );
};

const pickerStyles = StyleSheet.create({
  title: {
    color: Color.mainTextColor,
    fontSize: Size.px(18),
    fontWeight: '500'
  },
  actionText: {
    color: Color.primary,
    fontSize: Size.px(16),
    fontWeight: '400'
  }
});

export default CustomPicker;
