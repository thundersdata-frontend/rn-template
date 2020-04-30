/*
 * @文件描述: ChartWrap 图表的包裹图
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-04-30 10:15:42
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-30 10:19:07
 */
import React from 'react';
import { View } from 'react-native';
import Title from '../../components/Title';

interface ChartWrapProps {
  title: string;
  padding?: number; //
}
const ChartWrap: React.FC<ChartWrapProps> = props => {
  const { title, padding = 12 } = props;
  return (
    <View>
      <Title title={title}></Title>
      <View style={{ padding: padding === 0 ? 0 : padding }}>{props.children}</View>
    </View>
  );
};

export default ChartWrap;
