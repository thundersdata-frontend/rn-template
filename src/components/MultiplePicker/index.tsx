/*
 * @文件描述: 多选组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-04 23:32:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-16 11:32:00
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Modal, List, Checkbox } from '@ant-design/react-native';
import { Colors, Size } from '../../config';
import { SelectOption, valuesType } from '../../interfaces/common';
import { OnChangeParams } from '@ant-design/react-native/lib/checkbox/PropsType';
import { textEllipsis } from '../../utils/string';
import { withNavigation, NavigationScreenProp, NavigationRoute } from 'react-navigation';

export interface MultiplePickerProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  data: SelectOption[];
  value?: valuesType;
  onChange?: (values: valuesType) => void;
  placeholder?: string;
  visible?: boolean;
  style?: ViewStyle;
}

const CheckboxItem = Checkbox.CheckboxItem;

const MultiplePicker: React.FC<MultiplePickerProps> = props => {
  const { data, value, onChange, placeholder, visible, style } = props;
  const [useVisible, setVisible] = useState(false);
  const [useValue, setValue] = useState<valuesType>([]);
  const [openValue, setOpenValue] = useState<valuesType>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  // 选择框显示的内容
  const text =
    useValue && useValue.length > 0
      ? textEllipsis(
          useValue
            .map(val => {
              const currentIndex = data.findIndex(item => item.value === val);
              if (currentIndex !== -1) {
                return data[currentIndex].label;
              }
              return '';
            })
            .join(','),
          8,
        )
      : placeholder;

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

  // 设置modal里面的初始化与关闭的value
  useEffect(() => {
    if (useVisible) {
      setOpenValue(useValue);
    } else {
      setOpenValue([]);
    }
  }, [useVisible, useValue]);

  // 父组件可以控制value
  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  // 子选项变化是 判断要不要设置全选或取消全选
  useEffect(() => {
    if (openValue.length === 0) {
      setCheckAll(false);
    } else {
      setCheckAll(data.length > 0 && data.filter(item => openValue.includes(item.value)).length === data.length);
    }
  }, [openValue, data]);

  const onSelectChange = (selected?: valuesType) => {
    const selectedValues = selected || [];
    setValue(selectedValues);
    if (onChange) {
      onChange(selectedValues);
    }
  };

  const renderItem = (list: SelectOption[]) =>
    list.map(({ label, value }) => (
      <CheckboxItem
        key={value}
        checked={openValue.includes(value)}
        onChange={(event: OnChangeParams) => {
          const checked = event.target.checked;
          let currentValue = [...openValue];
          if (checked) {
            currentValue.push(value);
          } else {
            currentValue = currentValue.filter(current => current !== value);
          }
          setOpenValue(currentValue);
        }}
      >
        {label}
      </CheckboxItem>
    ));

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => (data.length > 0 ? setVisible(true) : null)} style={styles.picker}>
        <Text style={styles.picked}>{data.length > 0 ? text : '暂无数据'}</Text>
        <IconOutline name="caret-down" color={Colors.dark} />
      </TouchableOpacity>
      <Modal popup visible={useVisible} animationType="slide-up" onClose={() => setVisible(false)}>
        <View style={styles.content}>
          <List
            renderHeader={
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Text style={styles.textButton}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onSelectChange(openValue);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.textButton}>确定</Text>
                </TouchableOpacity>
              </View>
            }
          >
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <CheckboxItem
                checked={checkAll}
                onChange={(event: OnChangeParams) => {
                  const checked = event.target.checked;
                  // 全选与取消全选
                  if (checked) {
                    setOpenValue(data.map(item => item.value));
                  } else {
                    setOpenValue([]);
                  }
                  setCheckAll(checked);
                }}
              >
                全选
              </CheckboxItem>
              {renderItem(data)}
            </ScrollView>
          </List>
        </View>
      </Modal>
    </View>
  );
};

MultiplePicker.defaultProps = {
  value: [],
  placeholder: '请选择',
};

const styles = StyleSheet.create({
  picker: {
    minWidth: Size.px(120),
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
  picked: {
    color: Colors.dark,
    fontSize: Size.px(14),
    marginRight: Size.px(4),
    paddingHorizontal: Size.px(4),
  },
  scrollView: {
    backgroundColor: Colors.white,
    height: Size.px(400),
  },
  content: {
    paddingVertical: Size.px(4),
    paddingHorizontal: Size.px(8),
  },
  header: {
    height: Size.px(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Size.px(4),
  },
  textButton: {
    color: Colors.primary,
    fontSize: Size.px(16),
  },
});

export default withNavigation(MultiplePicker);
