/*
 * @文件描述: 防止heatmap图表多次渲染的memo组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-20 13:56:18
 * @LastEditors  : 陈杰
 * @LastEditTime : 2020-01-20 14:21:18
 */
import React from 'react';
import Heatmap, { HeatmapData } from '../Heatmap';

export interface MemoHeatmapProps {
  data: HeatmapData;
  height?: number;
}

const MemoHeatmap = ({ data, height }: MemoHeatmapProps) => {
  return <Heatmap data={data} height={height} />;
};

export default React.memo(MemoHeatmap, (prev, next) => {
  const { data } = next;
  return JSON.stringify(data) === JSON.stringify(prev.data);
});
