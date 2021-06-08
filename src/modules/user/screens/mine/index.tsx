import { StackNavigationProp } from '@react-navigation/stack';
import { Button, WhiteSpace } from '@td-design/react-native';
import Config from 'react-native-config';

import { Container } from 'components/Container';
import { Text } from 'components/Text';
import React from 'react';

export function Mine({ navigation }: { navigation: StackNavigationProp<MainStackParamList, 'Mine'> }) {
  return (
    <Container hasHeader={false}>
      <Button onPress={() => navigation.navigate('Address')} title="去地址信息页面" />
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('Echarts')} title="去图表页面" />
      <WhiteSpace />
      <Text>接口地址：{Config.authorization}</Text>
    </Container>
  );
}
