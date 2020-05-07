import React from 'react';
import { ScrollView } from 'react-native';
import Container from '../../../../components/Container';
import ChartWrap from '../../../../components/ChartWrap';
import ChartTable from './components/ChartTable';
import BaseTrendChart from './components/BaseTrendChart';
import Top5Chart from './components/Top5Chart';
import PieChart from './components/PieChart';
import MapChart from './components/MapChart';

export default function Chart() {
  return (
    <Container>
      <ScrollView>
        <ChartWrap title="chart下的表格图">
          <ChartTable />
        </ChartWrap>
        <ChartWrap title="基础柱状折线图">
          <BaseTrendChart />
        </ChartWrap>
        <ChartWrap title="Top5图" padding={0}>
          <Top5Chart />
        </ChartWrap>
        <ChartWrap title="Pie图">
          <PieChart />
        </ChartWrap>
        <ChartWrap title="MapChart">
          <MapChart />
        </ChartWrap>
      </ScrollView>
    </Container>
  );
}
