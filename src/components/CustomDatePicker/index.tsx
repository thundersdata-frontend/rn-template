/**
 * 样式改造后的datePicker组件
 */
import React from 'react';
import { DatePicker } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { Size, Color } from '../../config';
import { DatePickerPropsType } from '@ant-design/react-native/lib/date-picker/PropsType';

type CustomDatePickerProps = DatePickerPropsType;

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ children, ...restProps }) => {
  return (
    <DatePicker
      {...restProps}
      okText={'确定'}
      dismissText={'取消'}
      styles={pickerStyles}
      itemStyle={{ paddingTop: Size.px(10), paddingBottom: Size.px(10) }}>
      {children}
    </DatePicker>
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

export default CustomDatePicker;
