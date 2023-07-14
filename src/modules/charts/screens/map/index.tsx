import { useEffect, useRef } from 'react';

import * as echarts from 'echarts/core';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import { MapChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';

import { Container } from '@/components/Container';

import shandongMap from './370000.geo';

echarts.use([MapChart, GeoComponent, SVGRenderer]);

export function MapChartDemo() {
  const chart = useRef<echarts.ECharts>();
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      echarts.registerMap('shandong', shandongMap as any);
      const instance = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: 300,
        height: 250,
      });

      instance.setOption({
        backgroundColor: '#000',
        geo: {
          map: 'shandong',
          roam: false,
          silent: true,
          itemStyle: {
            areaColor: '#013C62',
            shadowColor: '#6aa1fb',
            shadowOffsetX: 2,
            shadowOffsetY: 5,
            shadowBlur: 8,
          },
        },
        series: [
          {
            name: 'shandong',
            type: 'map',
            roam: false,
            map: 'shandong',
            data: [],
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#1B4EB8',
              borderWidth: 1,
              borderColor: '#CDC4CB',
              shadowColor: '#1B4EB8',
              shadowOffsetX: -2,
              shadowBlur: 8,
            },
            select: {
              label: { show: false },
              itemStyle: {
                areaColor: '#49e7db',
                opacity: 0.6,
                borderWidth: 2,
                borderColor: '#16fff1',
              },
            },
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: '#49e7db',
                // opacity: 0.6,
                borderWidth: 2,
                borderColor: '#16fff1',
              },
            },
          },
        ],
      });

      chart.current = instance;
    }

    return () => chart.current?.dispose();
  }, []);

  return (
    <Container>
      <SvgChart ref={svgRef} />
    </Container>
  );
}
