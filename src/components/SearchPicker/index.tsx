/* eslint-disable complexity */
/*
 * @文件描述: 带搜索功能的Picker
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-08 11:28:00
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-07 17:43:58
 */
import React, { useState, memo, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { SearchBar, PickerView, Modal, List } from '@ant-design/react-native';
import { Color, Size } from '../../config';
import { textEllipsis } from '../../utils/string';
import { PickerDataType, valuesType } from '../../interfaces/common';

export interface SearchPickerProps {
  data: PickerDataType[];
  value?: valuesType;
  placeholder?: string;
  style?: ViewStyle;
  onChange: (value: valuesType) => void;
  cols?: number;
  // 当个cols为多个时，对哪个col进行搜索筛选。 0:筛选第一个col 1: 筛选第二个col
  searchIndex?: number;
  afterSubmit?: (value: string) => void;
  size?: 'small' | 'mid' | 'big';
  hasBorder?: boolean;
  centerText?: string;
}

const firstData: PickerDataType[] = [{ label: '请选择', value: '' }];
const SearchPicker: React.FC<SearchPickerProps> = ({
  data = [],
  value = [],
  placeholder,
  style,
  onChange,
  cols = 1,
  searchIndex = 0,
  afterSubmit,
  size,
  hasBorder,
  centerText
}) => {
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState<valuesType>([]);
  const [keywords, setKeywords] = useState('');
  let width;
  let maxShowLength: number | undefined;

  const styles = StyleSheet.create({
    picker: {
      minWidth: Size.px(90),
      height: Size.px(28),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hasBorder ? Size.ONE_PIXEL : 0,
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
    },
    content: {
      paddingVertical: Size.px(4),
      paddingHorizontal: Size.px(8)
    },
    header: {
      height: Size.px(36),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Size.px(4),
      paddingVertical: Size.px(4),
      paddingHorizontal: Size.px(8)
    },
    textButton: {
      color: Color.primary,
      fontSize: Size.px(16)
    },
    centerText: {
      color: Color.black,
      fontSize: Size.px(18),
      fontWeight: '500'
    }
  });

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
  let listData = useMemo(() => {
    return cols === 1 || searchIndex === 0
      ? data.filter(item => item.label?.includes(keywords))
      : data.map(material => {
          return {
            ...material,
            children: material?.children?.filter(item => item.label?.includes(keywords))
          };
        });
  }, [cols, data, keywords, searchIndex]);

  const handleSubmit = async (value: string) => {
    listData = [];
    afterSubmit && (await afterSubmit(value));
    setKeywords(value);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setVisible(true)} style={[styles.picker, width ? { width } : {}]}>
        <Text style={styles.picked}>{listData.length > 0 ? getLabel(pickerValue, listData) : '暂无数据'}</Text>
        {hasBorder ? (
          <IconOutline name="caret-down" color={Color.dark} />
        ) : (
          <IconOutline name="right" color={Color.labelColor} size={20} />
        )}
      </TouchableOpacity>
      <Modal maskClosable={true} popup visible={visible} animationType="slide-up" onClose={handleClose}>
        <View>
          <List
            renderHeader={
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Text style={styles.textButton}>取消</Text>
                </TouchableOpacity>
                <Text style={styles.centerText}>{centerText}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleOk();
                    setVisible(false);
                  }}>
                  <Text style={styles.textButton}>完成</Text>
                </TouchableOpacity>
              </View>
            }>
            <SearchBar
              placeholder={placeholder}
              onSubmit={value => handleSubmit(value)}
              showCancelButton={false}
              defaultValue={keywords}
              style={{ backgroundColor: Color.white }}
            />

            <PickerView
              onChange={setPickerValue}
              value={pickerValue}
              data={firstData.concat(listData)}
              cols={cols}
              itemStyle={styles.pickerItem}
            />
          </List>
        </View>
      </Modal>
    </View>
  );
};

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
