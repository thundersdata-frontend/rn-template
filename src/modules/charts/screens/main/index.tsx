import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components';
import React from 'react';

export function EchartsRoot() {
  const navigation = useNavigation<NavigationProp<MainStackParamList, 'Echarts'>>();
  return (
    <Container>
      <Button title="线图" onPress={() => navigation.navigate('LineChart')} />
      <WhiteSpace />
      <Button title="地图" onPress={() => navigation.navigate('MapChart')} />
    </Container>
  );
}
