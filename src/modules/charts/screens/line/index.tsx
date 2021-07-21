import { useEffect, useRef } from 'react';
import Echarts, { EchartsHandler } from '@td-design/react-native-echarts';
import { Button, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components';

export function LineChart() {
  const chart = useRef<EchartsHandler>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      chart.current?.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: `function (params) {
              if (Array.isArray(params)) {
                return params[0].name;
              }
              return params.name;
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
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      });
    }, 2000);

    return () => clearTimeout(timer);
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
          data: [82, 93, 90, 93, 129, 46, 66],
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
      <Echarts ref={chart} />
      <Button title="修改图表数据" onPress={modifyOptions} />
      <WhiteSpace />
      <Button title="清除图表" onPress={clearChart} />
      <WhiteSpace />
    </Container>
  );
}
