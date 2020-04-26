/*
 * @文件描述: 用于List.Item和CustomPicker组合的选择框，主要用于表单里选择数据
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-15 10:33:56
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:49:16
 */
import React from 'react';
import CustomPicker, { CustomPickerProps } from '../CustomPicker';
import { List } from '@ant-design/react-native';
import { toastFail } from '../../common';
import ListItemText from '../ListItemText';
import { ListItemPropsType } from '@ant-design/react-native/lib/list/PropsType';

interface CustomListItemPickerProps extends CustomPickerProps, Pick<ListItemPropsType, 'arrow'> {
  onPress?: () => void;
  text: string;
  required?: boolean;
}
export default function CustomListItemPicker({
  cols = 1,
  title,
  extra,
  data = [],
  disabled = false,
  value,
  onChange,
  arrow = 'horizontal',
  onPress,
  text,
  required = false
}: CustomListItemPickerProps) {
  const _extra = data.length > 0 ? '请选择' : '暂无数据';

  return (
    <CustomPicker
      cols={cols}
      title={title}
      extra={extra || _extra}
      data={data}
      disabled={disabled || data.length === 0}
      value={value}
      onChange={onChange}>
      <List.Item
        arrow={arrow}
        onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          if (data.length === 0) {
            toastFail('暂无数据');
            return;
          }
        }}>
        <ListItemText text={text} required={required} />
      </List.Item>
    </CustomPicker>
  );
}
