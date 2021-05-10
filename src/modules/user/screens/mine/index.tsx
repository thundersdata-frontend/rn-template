import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@td-design/react-native';

import { Container } from 'components/Container';
import { EchartsDemo } from './EchartsDemo';

export function Mine({ navigation }: { navigation: StackNavigationProp<MainStackParamList, 'Mine'> }) {
  return (
    <Container hasHeader={false}>
      <EchartsDemo />
      <Button onPress={() => navigation.navigate('Address')} title="去地址信息页面" />
    </Container>
  );
}
