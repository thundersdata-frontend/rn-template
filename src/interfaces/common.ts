import echarts from 'echarts';

// 与后台接口约定返回的配置项
export interface BaseChartOption {
  xAxis?: echarts.EChartOption.XAxis[];
  yAxis?: echarts.EChartOption.YAxis[];
  series: echarts.EChartOption.Series[];
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

// 额外的数据和属性
export interface MetadataType {
  // for map
  minCount?: number;
  maxCount?: number;
}

export interface FetchDataType<T> {
  title: string;
  subTitle?: string;
  data: T;
  metadata?: MetadataType;
}

export interface SelectOption {
  label: string;
  value: valueType;
  unit?: string;
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

export interface SelectOption {
  label: string;
  value: valueType;
  unit?: string;
}

export interface CascadeDataType extends SelectOption {
  children?: CascadeDataType[];
}
