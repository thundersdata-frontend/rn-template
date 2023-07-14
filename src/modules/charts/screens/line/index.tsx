import { useEffect, useRef } from 'react';

import * as echarts from 'echarts/core';
import { Button, WhiteSpace } from '@td-design/react-native';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import { LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';

import { Container } from '@/components/Container';

echarts.use([LineChart, GridComponent, TitleComponent, TooltipComponent, SVGRenderer]);

export function LineChartDemo() {
  const chart = useRef<echarts.ECharts>();
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const instance = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: 300,
        height: 250,
      });
      instance.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (
            params: { name: string; data: string | number } | { name: string; data: string | number }[]
          ) {
            if (Array.isArray(params)) {
              return params[0].name + ': ' + params[0].data;
            }
            return params.name + ': ' + params.data;
          },
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [82, 93, 90, 93, 129, 46, 66],
            type: 'line',
          },
        ],
      });

      chart.current = instance;
    }

    return () => chart.current?.dispose();
  }, []);

  const modifyOptions = () => {
    chart.current?.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: `function (params) {
          if (Array.isArray(params)) {
            return params[0].name + ": " + params[0].data;
          }
          return params.name + ": " + params.data;
        }`,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [82, 193, 190, 193, 129, 146, 66],
          type: 'line',
        },
      ],
    });
  };

  const clearChart = () => {
    chart.current?.clear();
  };

  return (
    <Container>
      <SvgChart ref={svgRef} />
      <Button title="修改图表数据" onPress={modifyOptions} />
      <WhiteSpace />
      <Button title="清除图表" onPress={clearChart} />
      <WhiteSpace />
    </Container>
  );
}
