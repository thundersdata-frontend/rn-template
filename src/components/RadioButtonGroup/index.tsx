/*
 * @文件描述: 单选按钮组合
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-04 00:43:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-18 18:27:22
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Color, Size } from '../../config';
import { SelectOption } from '../../interfaces/common';

type valueType = string | number;

export interface RadioButtonGroupProps {
  data: SelectOption[];
  value?: valueType;
  onChange?: (values: valueType, extra: SelectOption) => void;
  style?: ViewStyle;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = props => {
  const { data, onChange, style } = props;
  const dataLength = data.length;
  const [useValue, setValue] = useState<valueType>();

  // 父组件可以控制value
  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  /** 根据值和下标获取按钮样式 */
  const getButtonStyle = (value: valueType, index: number) => {
    let baseStyle = styles.button;
    if (value === useValue) {
      baseStyle = { ...baseStyle, ...styles.select };
    }
    if (index === 0) {
      baseStyle = { ...baseStyle, ...styles.first };
    }
    if (index === dataLength - 1) {
      baseStyle = { ...baseStyle, ...styles.last };
    }
    return baseStyle;
  };

  /** 获取button text及左边框样式 */
  const getButtonTextStyle = (value: valueType, index: number) => {
    let baseStyle = styles.buttonText;
    if (value !== useValue && index !== 0) {
      baseStyle = { ...baseStyle, ...styles.borderLeft };
    }
    return baseStyle;
  };

  /** 按钮切换 */
  const onGroupChange = (value: valueType, extra: SelectOption) => {
    if (value !== useValue) {
      setValue(value);
      if (onChange) {
        onChange(value, extra);
      }
    }
  };

  /** 渲染按钮 */
  const renderButton = (list: SelectOption[]) =>
    list.map((item, index) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={item.value}
        onPress={() => onGroupChange(item.value, item)}
        style={getButtonStyle(item.value, index)}>
        <View style={getButtonTextStyle(item.value, index)}>
          <Text style={{ color: item.value === useValue ? Color.dark : '#cccccc' }}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    ));
  return <View style={{ ...styles.container, ...style }}>{renderButton(data)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Size.px(4),
    borderRadius: Size.px(4),
    backgroundColor: '#f2f2f2'
  },
  first: {
    borderTopLeftRadius: Size.px(4),
    borderBottomLeftRadius: Size.px(4)
  },
  last: {
    borderTopRightRadius: Size.px(4),
    borderBottomRightRadius: Size.px(4)
  },
  select: {
    backgroundColor: Color.backgroundColor,
    borderRadius: Size.px(4),
    shadowOffset: { width: -2, height: 2 },
    shadowColor: Color.dark,
    shadowOpacity: 0.1
  },
  button: {
    height: Size.px(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderLeft: {
    borderLeftWidth: Size.px(1),
    borderLeftColor: '#e8e8e8'
  },
  buttonText: {
    fontSize: Size.px(14),
    height: Size.px(20),
    paddingLeft: Size.px(12),
    paddingRight: Size.px(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RadioButtonGroup;
