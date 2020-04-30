/* eslint-disable complexity */
/*
 * @文件描述: 带搜索功能的Picker
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-08 11:28:00
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-29 17:44:18
 */
import React, { useState, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { SearchBar, PickerView, Modal } from '@ant-design/react-native';
import { Color, Size } from '../../config';
import { textEllipsis } from '../../utils/string';
import { PickerDataType, valuesType } from '../../interfaces/common';

export interface SearchPickerProps {
  data: PickerDataType[];
  value?: valuesType;
  placeholder?: string;
  style?: ViewStyle;
  width?: number | string;
  onChange: (value: valuesType) => void;
  maxShowLength?: number;
  cols?: number;
  // 当个cols为多个时，对哪个col进行搜索筛选。 0:筛选第一个col 1: 筛选第二个col
  searchIndex?: number;
  afterSubmit?: (value: string) => void;
  size?: string;
}

const firstData: PickerDataType[] = [{ label: '请选择', value: '' }];
const SearchPicker: React.FC<SearchPickerProps> = ({
  data = [],
  value = [],
  placeholder,
  style,
  width,
  onChange,
  maxShowLength = 8,
  cols = 1,
  searchIndex = 0,
  afterSubmit,
  size
}) => {
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState<valuesType>([]);
  const [keywords, setKeywords] = useState('');

  // 现在APP只需要配置一个big的，后面出现特殊尺寸在增加
  const PICKER_SIZE = {
    big: {
      width: 174,
      maxShowLength: 9
    }
  };
  if (size === 'small' || size === 'mid' || size === 'big') {
    width = PICKER_SIZE[size].width;
    maxShowLength = PICKER_SIZE[size].maxShowLength;
  }

  /**
   * 确认选择的数据
   */
  const handleOk = () => {
    onChange(pickerValue!);
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
    setPickerValue(value);
  };

  const getLabel = (pickerValue: valuesType, data: PickerDataType[]) => {
    const item = data.find(item => {
      return item.value === pickerValue[0];
    });

    if (item) {
      return textEllipsis(item.label, maxShowLength);
    }
    return '请选择';
  };

  // 当cols为2时，根据searchIndex进行筛选
  let listData =
    cols === 1 || searchIndex === 0
      ? data.filter(item => item.label?.includes(keywords))
      : data.map(material => {
          return {
            ...material,
            children: material?.children?.filter(item => item.label?.includes(keywords))
          };
        });

  const handleSubmit = async (value: string) => {
    listData = [];
    afterSubmit && (await afterSubmit(value));
    setKeywords(value);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setVisible(true)} style={[styles.picker, width ? { width } : {}]}>
        <Text style={styles.picked}>{listData.length > 0 ? getLabel(pickerValue, listData) : '暂无数据'}</Text>
        <IconOutline name="caret-down" color={Color.dark} />
      </TouchableOpacity>
      <Modal maskClosable={true} popup visible={visible} animationType="slide-up" onClose={handleClose}>
        <View>
          <SearchBar
            placeholder={placeholder}
            onSubmit={value => handleSubmit(value)}
            onCancel={handleOk}
            cancelText="确定"
            showCancelButton
            defaultValue={keywords}
          />
          <PickerView
            onChange={setPickerValue}
            value={pickerValue}
            data={firstData.concat(listData)}
            cols={cols}
            itemStyle={styles.pickerItem}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    minWidth: Size.px(90),
    height: Size.px(28),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.borderColor,
    borderRadius: Size.px(2),
    overflow: 'hidden',
    paddingHorizontal: Size.px(2)
  },
  pickerItem: {
    paddingTop: Size.px(10),
    paddingBottom: Size.px(10)
  },
  picked: {
    color: Color.dark,
    fontSize: Size.px(14),
    marginRight: Size.px(4),
    paddingHorizontal: Size.px(4)
  }
});

export default memo(
  SearchPicker,
  (prevProps, nextProps) =>
    JSON.stringify({
      data: prevProps.data,
      value: prevProps.value
    }) ===
    JSON.stringify({
      data: nextProps.data,
      value: nextProps.value
    })
);
