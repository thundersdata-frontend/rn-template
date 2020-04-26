/*
 * @文件描述: 防止echarts图表多次渲染的memo组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-14 16:52:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-03-06 14:12:10
 */
import React from 'react';
import { ECharts } from '../Echarts';
import { getChartHeight, BASE_LEGEND_ROW_NUMBER } from '../../utils/chart-option';
import { EChartOption } from '../../interfaces/common';

export interface MemoEchartsProps {
  option: EChartOption;
  rowNumber?: number;
  height?: number;
}

const MemoEcharts = ({ option, rowNumber = BASE_LEGEND_ROW_NUMBER, height }: MemoEchartsProps) => {
  return <ECharts option={option} height={height || getChartHeight(option, rowNumber)} />;
};

export default React.memo(MemoEcharts, (prev, next) => {
  const { option } = next;
  return JSON.stringify(option) === JSON.stringify(prev.option);
});
