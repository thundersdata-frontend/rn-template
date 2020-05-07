import React from 'react';
import Container from '../../../../../../components/Container';
import HorizontalBarChart from '../../../../../../components/HorizontalBarChart';

export default function Top5Chart() {
  return (
    <Container>
      <HorizontalBarChart
        data={[
          { name: '付艳珍', value: 10290000, percentage: 80, unit: '元' },
          { name: '王洪章', value: 10290000, percentage: 80, unit: '元' },
          { name: '张艳凯', value: 10290000, percentage: 70, unit: '元' },
          { name: '肖莉', value: 10290000, percentage: 60, unit: '元' },
          { name: '张景坤', value: 10290000, percentage: 40, unit: '元' }
        ]}
      />
    </Container>
  );
}
