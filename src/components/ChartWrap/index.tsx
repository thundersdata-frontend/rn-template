/*
 * @文件描述: ChartWrap 图表的包裹图
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-30 10:15:42
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-30 10:34:03
 */
import React from 'react';
import { View } from 'react-native';
import Title from '../../components/Title';
import { Size } from '../../config';

interface ChartWrapProps {
  title: string;
  padding?: number; //默认为12
}
const ChartWrap: React.FC<ChartWrapProps> = props => {
  const { title, padding = Size.px(12) } = props;
  return (
    <View>
      <Title title={title}></Title>
      <View style={{ padding: padding === 0 ? 0 : padding }}>{props.children}</View>
    </View>
  );
};

export default ChartWrap;
