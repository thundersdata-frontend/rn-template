import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Container from 'components/Container';

export default function Address({
  navigation,
}: {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Address'>;
}) {
  return (
    <Container>
      <View>
        <Text>address</Text>
      </View>
    </Container>
  );
}
