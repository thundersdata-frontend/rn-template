/*
 * @文件描述: picker单选组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-03 19:05:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-17 16:34:00
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Picker } from '@ant-design/react-native';
import { Colors, Size } from '../../config';
import { SelectOption, valueType, valuesType } from '../../interfaces/common';
import { textEllipsis } from '../../utils/string';
import { withNavigation, NavigationScreenProp, NavigationRoute } from 'react-navigation';

export interface SinglePickerProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  data: SelectOption[];
  value?: valueType;
  onChange?: (values: valueType, extra?: SelectOption) => void;
  placeholder?: string;
  visible?: boolean;
  style?: ViewStyle;
}

const SinglePicker: React.FC<SinglePickerProps> = props => {
  const { data, value, onChange, placeholder, visible, style } = props;
  const [useVisible, setVisible] = useState(false);
  const [useValue, setValue] = useState<valuesType>([]);
  const currentIndex = useValue.length > 0 ? data.findIndex(item => item.value === useValue[0]) : -1;
  // 选择框显示的内容
  const text = currentIndex != -1 ? textEllipsis(data[currentIndex].label, 8) : placeholder;
  const isDataEmpty = data.length > 0;

  // 绑定监听
  useEffect(() => {
    const listener = props.navigation.addListener('willBlur', () => {
      setVisible(false);
    });
    return () => {
      listener.remove();
    };
  }, [props.navigation]);

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
      <TouchableOpacity onPress={() => (isDataEmpty ? setVisible(true) : null)} style={styles.picker}>
        <Text style={styles.picked}>{isDataEmpty ? text : '暂无数据'}</Text>
        <IconOutline name="caret-down" color={Colors.dark} />
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
        itemStyle={styles.pickerItem}
      />
    </View>
  );
};

SinglePicker.defaultProps = {
  placeholder: '请选择',
};

const styles = StyleSheet.create({
  picker: {
    minWidth: Size.px(60),
    height: Size.px(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Size.ONE_PIXEL,
    borderColor: Colors.borderColor,
    borderRadius: Size.px(2),
    overflow: 'hidden',
    paddingHorizontal: Size.px(2),
  },
  pickerItem: {
    paddingTop: Size.px(10),
    paddingBottom: Size.px(10),
  },
  picked: {
    color: Colors.dark,
    fontSize: Size.px(14),
    marginRight: Size.px(4),
    paddingHorizontal: Size.px(4),
  },
});

export default withNavigation(SinglePicker);
