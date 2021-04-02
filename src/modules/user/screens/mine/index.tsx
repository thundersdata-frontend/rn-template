import React from 'react';
import { Text } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Container from 'components/Container';
import { Button } from '@td-design/react-native';

export default function Mine({ navigation }: { navigation: NativeStackNavigationProp<MainStackParamList, 'Mine'> }) {
  return (
    <Container hasHeader={false}>
      <Text>123</Text>
      <Button onPress={() => navigation.navigate('Address')} title="去地址信息页面" />
    </Container>
  );
}
