/*
 * @文件描述: echarts option配置获取
 * 注意：formatter类方法里面不可以引入外部变量 否则会引起图表渲染异常
 */
import echarts from 'echarts';
import { BaseChartOption, MetadataType, EChartOption } from '../interfaces/common';
import { valueFormat } from './string';
import { isObject } from 'lodash';
import { chartColors } from './colors';

// 图表初始化标准高度
const BASE_HEIGHT = 300;
// 一行图例的占高
const BASE_LEGEND_HEIGHT = 20;
// 一行图例的数量
const BASE_LEGEND_ROW_NUMBER = 3;
// dataZoom 的高度
const DATA_ZOOM_HEIGHT = 70;
// grid bottom 默认底部边距
const GRID_BOTTOM_PADDING = 30;
// 基础间距
const BASE_PADDING = 5;

/** 获取基础趋势图的配置项（折线、柱图） */
export const getBaseTrendOption = (fetchOption: BaseChartOption, showDataZoom = true) => {
  const { xAxis = [], yAxis = [], series = [] } = fetchOption || {};
  const newSeries = seriesFormat(series);
  // 默认的color
  // 图例数量超过6个 使用生成的颜色
  const colors =
    getLegendData(series).length > 6 ? chartColors : ['#218ee9', '#f9751c', '#5ec521', '#FCBA1C', '#6240f2'];
  // series的通用默认配置
  const seriesConfig: object = {
    barMaxWidth: 30,
    itemStyle: {
      normal: {
        // bar 上面两个圆角
        barBorderRadius: [5, 5, 0, 0],
      },
    },
  };
  // x轴的通用默认配置
  const xAxisConfig: echarts.EChartOption.XAxis = {
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#bec0c1',
      fontSize: 14,
    },
  };

  // y轴的通用默认配置
  const yAxisConfig: echarts.EChartOption.YAxis = {
    splitLine: { show: true, lineStyle: { color: ['#f2f2f2'] } },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      color: '#bcbdbd',
    },
  };

  const option: EChartOption = {
    grid: {
      top: '10%',
      left: hasYAxis(series, 0) ? '15%' : 0,
      right: hasYAxis(series, 1) ? '15%' : '5%',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params: echarts.EChartOption.Tooltip.Format[] | echarts.EChartOption.Tooltip.Format) {
        if (!Array.isArray(params)) {
          return '';
        }
        const str = params.length > 0 ? `${params[0].axisValue}<br />` : '';
        return str + params.map(({ seriesName, data }) => `${seriesName}：${data.valueFormat}`).join('<br />');
      },
      // 修复tooltip被遮挡问题
      confine: true,
      // 选中时的辅助线
      axisPointer: {
        type: 'line',
        lineStyle: {
          width: 30,
          opacity: 0.2,
        },
      },
    },
    legend: createLegendsFromSeries(series),
    xAxis: xAxis.map(data => {
      const config: echarts.EChartOption.XAxis = getXAxisFormatterConfig({ ...xAxisConfig, ...data });
      delete config.name;
      return config;
    }),
    yAxis: yAxis.map(data => getYAxisFormatterConfig({ ...yAxisConfig, ...data })),
    series: newSeries.map(data => ({ ...seriesConfig, ...data })),
    color: colors,
  };
  option.grid!['bottom'] = getGridBottom(option, showDataZoom);
  if (showDataZoom) {
    return {
      ...option,
      dataZoom: [
        {
          type: 'slider',
          bottom: getLegendHeight(option) + BASE_PADDING,
        },

        {
          type: 'inside',
        },
      ],
    };
  }
  return option;
};

/** 获取基础饼图的配置项 */
export const getBasePieOption = (fetchOption: BaseChartOption) => {
  const { series = [] } = fetchOption || {};
  const newSeries = seriesFormat(series);
  // 图例数量超过6个 使用生成的颜色
  const colors =
    getLegendData(series).length > 6
      ? chartColors
      : ['#1890FF', '#3AB8E7', '#5EC521', '#FEE671', '#FC751C', '#FCBA1C', '#CB2EE3', '#F5536C', '#6240F2', '#2859DB'];
  // series的通用默认配置
  const seriesConfig: echarts.EChartOption.Series = {
    type: 'pie',
    avoidLabelOverlap: false,
    radius: ['45%', '65%'],
    center: ['50%', '40%'],
    label: {
      normal: {
        show: false,
        position: 'center',
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: 24,
          color: '#3b3b3b',
          fontWeight: 'bold',
        },
        formatter: (params: echarts.EChartOption.Tooltip.Format) => {
          const { name, percent, data } = params;
          return name ? `${data.valueFormat}\nn{subLabel|${+percent!.toFixed(2)}%}` : '';
        },
        rich: {
          subLabel: {
            color: '#787878',
            align: 'center',
            fontSize: 16,
            padding: [10, 0],
          },
        },
      },
    },
  };
  const option: EChartOption = {
    grid: {},
    color: colors,
    toolbox: {
      show: false,
    },
    legend: createLegendsFromSeries(newSeries),
    series: newSeries.map(dataConfig => {
      const config: object = { ...seriesConfig, ...dataConfig };
      return config;
    }),
  };
  option.grid!['bottom'] = getGridBottom(option, false);
  return option;
};

/** 获取基础地图的配置项 */
export const getBaseMapOption = (fetchOption: BaseChartOption, metadata?: MetadataType) => {
  const { series = [] } = fetchOption || {};
  const { maxCount = 200 } = metadata || {};
  // series的通用默认配置
  const seriesConfig: echarts.EChartOption.Series = {
    type: 'map',
    map: 'china',
    geoIndex: 0,
    aspectScale: 0.75, //长宽比
    showLegendSymbol: false, // 存在legend时显示
    label: {
      normal: {
        show: true,
      },
      emphasis: {
        show: false,
        textStyle: {
          color: '#fff',
        },
      },
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#ccc',
        borderColor: '#3B5077',
      },
      emphasis: {
        areaColor: '#ccc',
      },
    },
    animation: false,
  };
  const option: EChartOption = {
    legend: {
      top: 0,
    },
    visualMap: [
      {
        type: 'continuous',
        show: true,
        min: 0,
        max: maxCount,
        formatter: valueFormat,
        itemHeight: 80,
        left: 0,
        top: 'bottom',
        calculable: true,
        seriesIndex: [0],
        inRange: {
          color: ['#fcdd2d', '#f95820'],
        },
      },
    ],
    geo: {
      show: true,
      silent: true,
      roam: false,
      map: 'china',
      zoom: 1.1,
      center: [100, 36.5],
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#ccc',
          borderColor: '#fff',
        },
        emphasis: {
          areaColor: '#ccc',
        },
      },
    },
    series: series.map(dataConfig => {
      const config: object = { ...seriesConfig, ...dataConfig };
      return config;
    }),
  };
  return option;
};

/** 判断echarts是否是空数据 */
export const isOptionEmpty = (option: EChartOption) => !option || !option.series || option.series.length === 0;

/**
 * 根据配置项中是否有图例以及图例的个数返回自适应的高度
 * @param option echarts option
 */
export const getChartHeight = (option: EChartOption) => {
  const addZoomHeight = option.dataZoom ? DATA_ZOOM_HEIGHT : 0;
  const legendHeight = getLegendHeight(option);
  const addLegendHeight = legendHeight - BASE_LEGEND_HEIGHT - BASE_PADDING;
  const chartHeight = BASE_HEIGHT + (addLegendHeight < 0 ? 0 : addLegendHeight) + addZoomHeight;
  return chartHeight;
};

/**
 * 根据配置项中
 * 是否有图例以及图例的个数
 * 是否有zoom
 * 返回option grid的bottom值
 * @param option echarts option
 * @param showDataZoom 是否有zoom
 */
export const getGridBottom = (option: EChartOption, showDataZoom: boolean) => {
  const { legend } = option;
  const addZoomHeight = showDataZoom ? DATA_ZOOM_HEIGHT : 0;
  // 不存在图例的情况
  if (isObject(legend) && (legend as echarts.EChartOption.Legend).show === false) {
    return addZoomHeight;
  }
  // 存在图例的情况
  // 图例占用高度
  const legendHeight = getLegendHeight(option);
  return (showDataZoom ? DATA_ZOOM_HEIGHT : GRID_BOTTOM_PADDING) + legendHeight;
};

/**
 * 获取图例占用的高度
 * @param option
 */
export const getLegendHeight = (option: echarts.EChartOption) => {
  const { legend, series = [] } = option;
  // 不存在图例的情况
  if (isObject(legend) && (legend as echarts.EChartOption.Legend).show === false) {
    return 0;
  }
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = getLegendData(series);
  return getLegendHeightByData(allLegendData);
};

export const getLegendHeightByData = (data: echarts.EChartOption.Legend.LegendDataObject[]) =>
  Math.ceil(data.length / BASE_LEGEND_ROW_NUMBER) * (BASE_LEGEND_HEIGHT + BASE_PADDING);

/**
 * 从series中获取所有图例的data
 * @param series
 */
export const getLegendData = (series: echarts.EChartOption.Series[] = []) => {
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = [];
  series.forEach(item => {
    const data: { name: string }[] = item['data'] || [];
    // 饼图的图例在series.data里面
    if (item.type === 'pie') {
      allLegendData.push(...data.map(({ name }) => ({ name, icon: 'rect' })));
    } else {
      allLegendData.push({ name: item['name'], icon: item.type === 'line' ? '' : 'rect' });
    }
  });
  return allLegendData;
};

/**
 * 从系列中创建多行图例
 */
export const createLegendsFromSeries = (series: echarts.EChartOption.Series[] = []) => {
  const legends: echarts.EChartOption.Legend[] = [];
  const allLegendData: echarts.EChartOption.Legend.LegendDataObject[] = getLegendData(series);
  const legendNumber = Math.ceil(allLegendData.length / BASE_LEGEND_ROW_NUMBER);
  const maxHeight = getLegendHeightByData(allLegendData) - BASE_PADDING;
  for (let i = 0; i < legendNumber; i++) {
    const legendData = allLegendData.slice(
      i * BASE_LEGEND_ROW_NUMBER,
      i * BASE_LEGEND_ROW_NUMBER + BASE_LEGEND_ROW_NUMBER,
    );
    // 超过2行的图例 其他设置不选中
    // 这里会有一个问题，初始化的时候，设置了selected的图例，需要点2次才能切换初始化的状态
    // 目前这个问题处于open状态 https://github.com/apache/incubator-echarts/issues/5391
    // const selected = {};
    // if (i > 1) {
    //   legendData.forEach(({ name }) => {
    //     if (name) {
    //       selected[name] = false;
    //     }
    //   });
    // }
    const config: echarts.EChartOption.Legend = {
      bottom: maxHeight - (i + 1) * BASE_LEGEND_HEIGHT - i * BASE_PADDING,
      orient: 'horizontal', // vertical
      data: legendData,
      formatter: (name: string) => `{a|${name.length > 4 ? name.substring(0, 4) + '...' : name}}`,
      // selected,
      textStyle: {
        rich: {
          a: {
            color: '#848484',
            fontSize: 14,
            width: 60,
            height: BASE_LEGEND_HEIGHT,
          },
        },
      },
      itemHeight: BASE_LEGEND_HEIGHT,
    };
    if (legendData.length === 2) {
      config.formatter = (name: string) => `{a|${name.length > 6 ? name.substring(0, 6) + '...' : name}}`;
    }
    if (legendData.length === 1) {
      config.formatter = (name: string) => `{a|${name.length > 8 ? name.substring(0, 8) + '...' : name}}`;
    }
    legends.push(config);
  }
  return legends;
};

/**
 * 根据series数据判断是否存在对应的坐标轴
 * @param series
 * @param index 对应的yAxisIndex
 */
export const hasYAxis = (series: echarts.EChartOption.Series[] = [], index: number) =>
  series.findIndex(item => item['yAxisIndex'] === index) > -1;

/**
 * 对series里面的data进行格式化
 * @param series
 */
export const seriesFormat = (series: echarts.EChartOption.Series[]) => {
  // 解决formatter不能引入函数问题
  const newSeries: echarts.EChartOption.Series[] = [];
  series.forEach(item => {
    const data = item['data'] || [];
    newSeries.push({
      ...item,
      data: data.map((valueItem: { value: number }) => ({
        ...valueItem,
        valueFormat: `${valueFormat(valueItem.value)}${valueItem['unit'] || ''}`,
      })),
    });
  });
  return newSeries;
};

/**
 * 获取xAxis format后的config
 * @param config
 */
export const getXAxisFormatterConfig = (config: echarts.EChartOption.XAxis) => {
  if (config.type === 'value') {
    // 下面注释掉的写法会导致图表显示不出来 暂时不知道原因
    config.axisLabel!.formatter = valueFormat;
    // config.axisLabel!.formatter = (value: number) => `${valueFormat(value)}${data.name}`;
  }
  return config;
};

/**
 * 获取yAxis format后的config
 * @param config
 */
export const getYAxisFormatterConfig = (config: echarts.EChartOption.YAxis) => {
  if (config.type === 'value') {
    config.axisLabel!.formatter = valueFormat;
  }
  return config;
};
