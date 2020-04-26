/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-14 11:16:15
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 15:40:31
 */
import echarts from 'echarts';
import { InternalNamePath } from 'rc-field-form/lib/interface';

// 与后台接口约定返回的配置项
export interface BaseChartOption {
  xAxis?: echarts.EChartOption.XAxis[];
  yAxis?: echarts.EChartOption.YAxis[];
  series: echarts.EChartOption.Series[];
}

/**
 * 饼图数据
 */
export interface PieData {
  name: string;
  value: number;
}

/**
 * 雷达图Indicator数据
 */
export interface RadarIndicatorData {
  name: string;
  max: number;
}

// 指标类非图表通用约定
export interface BaseQuotaType {
  name: string;
  value: number;
  unit?: string;
  percentage?: number;
}

export type valueType = string | number;

export type valuesType = Array<string | number>;

export interface SelectOption {
  label: string;
  value: valueType;
  [key: string]: unknown;
}

export type EChartOption = Merge<
  echarts.EChartOption,
  { legend?: echarts.EChartOption.Legend | echarts.EChartOption.Legend[] }
>;

// 子组件的通用props定义
export interface ChildrenProps {
  refreshing: boolean;
  onFetchFinish: () => void;
}

export interface ActionProps {
  type: string;
  value: string;
}

export interface CascadeDataType extends SelectOption {
  children?: CascadeDataType[];
}

export type ErrorField = {
  name: InternalNamePath;
  errors: string[];
};
