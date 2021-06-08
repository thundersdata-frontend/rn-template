import { StackNavigationProp } from '@react-navigation/stack';
import { Button, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components/Container';
import React from 'react';

export function EchartsRoot({ navigation }: { navigation: StackNavigationProp<MainStackParamList, 'Echarts'> }) {
  return (
    <Container>
      <Button title="线图" onPress={() => navigation.navigate('LineChart')} />
      <WhiteSpace />
      <Button title="地图" onPress={() => navigation.navigate('MapChart')} />
    </Container>
  );
}
