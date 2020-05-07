import React from 'react';
import Container from '../../../../../../components/Container';
import { getBaseMapOption } from '../../../../../../utils/chart-option';
import { Size } from '../../../../../../config';
import MemoEcharts from '../../../../../../components/MemoEcharts';

export default function MapChart() {
  const chartData = {
    data: {
      series: [
        {
          name: '热力图',
          type: 'map',
          data: [
            {
              name: '上海市',
              value: [121.480539, 31.235929, 8000]
            },
            {
              name: '北京市',
              value: [116.413384, 39.910925, 6000]
            },
            {
              name: '黑龙江省',
              value: [126.669653, 45.74793, 2000]
            },
            {
              name: '云南省',
              value: [126.669653, 45.74793, 5000]
            }
          ]
        }
      ]
    },
    metadata: {
      maxCount: 8000
    }
  };
  const option = getBaseMapOption(chartData.data, chartData.metadata);
  return (
    <Container>
      <MemoEcharts option={option} height={Size.px(220)} />
    </Container>
  );
}
