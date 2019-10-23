/*
 * @文件描述: 防止echarts图表多次渲染的memo组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-14 16:52:00
 * @LastEditors: 阮旭松
 * @LastEditTime: 2019-10-18 19:05:54
 */
import React from 'react';
import { Size } from '../../config';
import { Echarts } from '../Echarts';
import { getChartHeight } from '../../utils/chart-option';
import { EChartOption } from '../../interfaces/common';

export interface MemoEchartsProps {
  option: EChartOption;
  height?: number;
  /** 是否禁用默认高亮 */
  disabledSelect?: boolean;
  onChange?: (e: Echarts | null) => void;
}

const MemoEcharts = ({ option, height, disabledSelect, onChange }: MemoEchartsProps) => {
  return (
    <Echarts
      disabledSelect={disabledSelect}
      option={option}
      height={height || Size.px(getChartHeight(option))}
      ref={e => onChange && onChange(e)}
    />
  );
};

export default React.memo(MemoEcharts, (prev, next) => {
  const { option } = next;
  return JSON.stringify(option) === JSON.stringify(prev.option);
});
