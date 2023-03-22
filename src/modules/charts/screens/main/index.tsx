import React from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function EchartsRoot() {
  const navigation = useNavigation<NavigationProp<MainStackParamList, 'EchartsDemo'>>();
  return (
    <Container>
      <Button title="线图" onPress={() => navigation.navigate('LineChartDemo')} />
      <WhiteSpace />
      <Button title="地图" onPress={() => navigation.navigate('MapChartDemo')} />
    </Container>
  );
}
