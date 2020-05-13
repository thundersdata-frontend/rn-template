import React from 'react';
import Container from '../../../../../../components/Container';
import { getBasePieOption, isOptionEmpty } from '../../../../../../utils/chart-option';
import DataEmpty from '../../../../../../components/DataEmpty';
import MemoEcharts from '../../../../../../components/MemoEcharts';

export default function PieChart() {
  const chartData = [
    {
      name: 'A',
      value: 150
    },
    {
      name: 'B',
      value: 130
    },
    {
      name: 'C',
      value: 440
    }
  ] as echarts.EChartOption.SeriesPie.DataObject[];
  const chartOption = getBasePieOption(chartData, 3);

  return (
    <Container>
      <DataEmpty visible={isOptionEmpty(chartOption)}>
        <MemoEcharts option={chartOption} isHighlightFirst={true} />
      </DataEmpty>
    </Container>
  );
}
