/*
 * @文件描述: picker单选组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-03 19:05:00
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:47:34
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Picker } from '@ant-design/react-native';
import { Color, Size } from '../../config';
import { SelectOption, valueType, valuesType } from '../../interfaces/common';
import Iconfont from '../../components/Iconfont';
import { textEllipsis } from '../../utils/string';
import { useNavigation } from '@react-navigation/native';

export interface SinglePickerProps {
  data: SelectOption[];
  value?: valueType;
  onChange?: (values: valueType, extra?: SelectOption) => void;
  placeholder?: string;
  visible?: boolean;
  style?: ViewStyle;
  title?: string;
  inHeader?: boolean;
}

// eslint-disable-next-line complexity
const SinglePicker: React.FC<SinglePickerProps> = props => {
  const { data, value, onChange, placeholder, visible, title, style, inHeader = false } = props;

  const [useVisible, setVisible] = useState(false);
  const [useValue, setValue] = useState<valuesType>([]);
  const navigation = useNavigation();

  const currentIndex = useValue.length > 0 ? data.findIndex(item => item.value === useValue[0]) : -1;
  // 选择框显示的内容
  const text = currentIndex != -1 ? textEllipsis(data[currentIndex].label, 10) : placeholder;
  const isDataEmpty = data.length > 0;

  // 绑定监听
  useEffect(() => {
    navigation.addListener('blur', () => {
      setVisible(false);
    });
    return () => {
      navigation.removeListener('blur', () => {
        setVisible(false);
      });
    };
  }, [navigation]);

  // 内部和父组件都可以控制显隐
  useEffect(() => {
    if (visible !== undefined) {
      setVisible(visible);
    }
  }, [visible]);

  // 父组件可以控制value
  useEffect(() => {
    if (value !== undefined) {
      setValue([value]);
    }
  }, [value]);

  const findExtra = (value: valueType) => data.find(item => item.value === value);

  const onPickerChange = (values?: valuesType) => {
    const selectedValues = values || [];
    setValue(selectedValues);
    if (onChange && selectedValues.length > 0) {
      const value = selectedValues[0];
      const extra = findExtra(value);
      onChange(value, extra);
    }
  };

  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => (isDataEmpty ? setVisible(true) : null)}
        style={styles.picker}>
        <Text style={[styles.picked, inHeader ? { color: Color.white, fontSize: Size.px(14) } : {}]}>
          {isDataEmpty ? text : '暂无数据'}
        </Text>
        <Iconfont
          name="bottomArrow"
          size={inHeader ? Size.px(10) : Size.px(8)}
          color={inHeader ? Color.white : Color.labelColor}
        />
      </TouchableOpacity>
      <Picker
        visible={useVisible}
        onChange={onPickerChange}
        value={useValue}
        data={[data]}
        cascade={false}
        cols={1}
        onOk={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
        title={title}
        itemStyle={styles.pickerItem}
        styles={pickerStyles}
        okText={'确定'}
        dismissText={'取消'}
      />
    </View>
  );
};

SinglePicker.defaultProps = {
  placeholder: '请选择'
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

const styles = StyleSheet.create({
  picker: {
    minWidth: Size.px(60),
    width: '100%',
    height: Size.px(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: Size.px(2)
  },
  pickerItem: {
    paddingTop: Size.px(10),
    paddingBottom: Size.px(10)
  },
  picked: {
    fontSize: Size.px(12),
    fontWeight: '400',
    color: Color.mainTextColor,
    marginRight: Size.px(4)
  }
});

export default SinglePicker;
