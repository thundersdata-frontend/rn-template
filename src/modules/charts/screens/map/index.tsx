import { useEffect, useRef } from 'react';
import Echarts, { EchartsHandler } from '@td-design/react-native-echarts';
import { Container } from 'components';

import shandongMap from './370000.geo';

export function MapChart() {
  const chart = useRef<EchartsHandler>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      chart.current?.setOption({
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const extraCode = `
    var shandongMapData = ${JSON.stringify(shandongMap)};
    echarts.registerMap('shandong', shandongMapData);
  `;

  return (
    <Container>
      <Echarts ref={chart} extraCode={extraCode} />
    </Container>
  );
}
